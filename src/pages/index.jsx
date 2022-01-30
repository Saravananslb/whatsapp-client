import React, { useContext, useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { Context } from "../store/Context";
import { ChatArea } from "./ChatArea";
import { SideBar } from "./SideBar";
import { LandChatScreen } from '../components/LandChatScreen';
import { cookies } from "../services/apiCall";
import { USER_INFO, IS_AUTHENTICATE } from "../store/action.types";
import { validateUser } from "../services/apiCall";
import { useNavigate } from "react-router-dom";

export const Home = () => {

    const navigate = useNavigate()

    const { state, dispatch } = useContext(Context);

    useEffect (() => {
        if (!state.isAuthenticated) {
            const user = validateUser();
            dispatch({
                type: USER_INFO,
                payload: {
                    user: user
                }
            });
            dispatch({
                type: IS_AUTHENTICATE,
                payload: {
                    isAuthenticated: user.status
                }
            })
        }
        else if (!state.isAuthenticated && !cookies.get('Authorization')) {
            navigate('/signin')
        }
        else {
            navigate('/')
        }
    }, [])

    return (
        <>
            <div className="grid-container">
                <div className="side-area-container">
                    < SideBar />
                </div>
                <div className="chat-area-container">
                    {state.chatUser.id ? < ChatArea /> : <LandChatScreen />}
                    
                </div>
            </div>
        </>
    )
}