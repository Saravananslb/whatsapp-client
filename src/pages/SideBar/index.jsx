import React, { useContext, useEffect, useState } from "react";
import { Profile } from "../../components/Profile";
import { SearchBar } from "../../components/Search";
import { ChatProfile } from "../../components/ChatProfile";
import { getContactsUser, getUserChatList } from "../../services/apiCall";
import { Context } from "../../store/Context";
import { CHAT_USER, ENABLE_CONTACT } from "../../store/action.types";
import { PersonPlus } from 'react-bootstrap-icons';
import './sideBar.css';

export const SideBar = () => {
  // const [userChats, setUserChats] = useState([]);

  const {state, dispatch} = useContext(Context);

  const onSelectChat = (chatUser) => {
    console.log(chatUser)
      dispatch({
          type: CHAT_USER,
          payload: {
              chatUser: chatUser
          }
      })
  }

  const addContact = () => {
    dispatch({
      type: ENABLE_CONTACT,
      payload: {
        isEnabled: true
      }
    });
  }

  return (
    <>
      <div className="profile-container">
        <Profile chatUser={state.user}/>
        <PersonPlus className="add-contact-btn" onClick={addContact}/>
      </div>
      <div>
        <SearchBar />
      </div>
      <div style={{ border: "2px solid #d7dee0", height: '570px', overflowX: 'hidden', overflowY: 'auto', textAlign: 'justify' }}>
        {state.userContacts.map((item) => (
          <ChatProfile 
            chatUsers={item}
            isSelected={item._id == state.chatUser._id}
            onSelectChat={onSelectChat}
          />
        ))}
      </div>
    </>
  );
};
