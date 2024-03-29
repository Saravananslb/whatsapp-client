import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react/cjs/react.development";
import { Context } from "../store/Context";
import { ChatArea } from "./ChatArea";
import { SideBar } from "./SideBar";
import { LandChatScreen } from '../components/LandChatScreen';
import { cookies } from "../services/apiCall";
import { USER_INFO, IS_AUTHENTICATE, SET_CONTACT, SET_TEMP_CONTACT, ADD_CHAT } from "../store/action.types";
import { validateToken, getContactsUser } from "../services/apiCall";
import { useNavigate } from "react-router-dom";
import { b64toBlob } from "../utils/b64toBlob";
import { AddContactModal } from "../components/Modal";

export const Home = () => {

    const navigate = useNavigate()

    const { state, dispatch } = useContext(Context);

    let wsRef = useRef();

    useEffect (async() => {
        wsRef.current = new WebSocket("ws:\\127.0.0.1:8080");

        console.log(wsRef.current);
        console.log(state.chats);

        wsRef.current.addEventListener("open", () => {
        wsRef.current.send(
            JSON.stringify({
            senderId: state.user._id,
            type: "init",
            })
        );
        });
        if (!state.isAuthenticated && cookies.get('Authorization')) {
            const user = await validateToken();
            console.log(user)
            if (user.status == 200) {
                const blob = b64toBlob(user.data.profilePic, user.data.imageType);
                const blobUrl = URL.createObjectURL(blob);
                console.log(blobUrl)
                dispatch({
                  type: USER_INFO,
                  payload: {
                    user: { ...user.data, profilePic: blobUrl }
                  }
                });
                dispatch({
                    type: IS_AUTHENTICATE,
                    payload: {
                        isAuthenticated: user.data.status
                    }
                })
                console.log(state)
                navigate('/');
                getUserChats(user.data.contact);
            }
            else {
                cookies.remove('Authorization');
                navigate('/signin')
            }
            
        }
        else if (!state.isAuthenticated && !cookies.get('Authorization')) {
            navigate('/signin')
        }
        else {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        wsRef.current.addEventListener("message", (e) => {
          let recievedData = JSON.parse(e.data);
          console.log(state.chats);
          let existingData = state.chats[recievedData._id]?.message || [];
          let payload = {
            [recievedData._id]: {
              _id: recievedData._id,
              message: [
                ...existingData,
                {
                  senderId: recievedData.senderId,
                  recieverId: recievedData.recieverId,
                  value: recievedData.message,
                },
              ],
            },
          };
    
          dispatch({
            type: ADD_CHAT,
            payload: payload,
          });
        });
      }, [state.chats]);

    const getUserChats = async(contact) => {
        const chats = await getContactsUser({contact: state.user.contact ? state.user.contact : contact});
        if (chats.status == 200){
            const newChats = chats.data.map(item => {
                const blob = b64toBlob(item.profilePic, item.imageType);
                const blobUrl = URL.createObjectURL(blob);
                item.profilePic = blobUrl;
                return item
            })
            dispatch({
                type: SET_CONTACT,
                payload: {
                    userContacts: newChats            }
            })
            dispatch({
                type: SET_TEMP_CONTACT,
                payload: {
                    userContactsTemp: newChats            }
            })
        }
        
      };

    return (
        <>
        
            <div className="grid-container">
                <div className="side-area-container">
                    < SideBar />
                </div>
                <div className="chat-area-container">
                < AddContactModal />
                    {state.chatUser._id ? < ChatArea webSocket={wsRef.current} /> : <LandChatScreen />}
                    
                </div>
            </div>
        </>
    )
}