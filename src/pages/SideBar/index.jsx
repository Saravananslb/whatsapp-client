import React, { useContext, useEffect, useState } from "react";
import { Profile } from "../../components/Profile";
import { SearchBar } from "../../components/Search";
import { ChatProfile } from "../../components/ChatProfile";
import { getUserChatList } from "../../services/apiCall";
import { Context } from "../../store/Context";
import { CHAT_USER } from "../../store/action.types";

export const SideBar = () => {
  const [userChats, setUserChats] = useState([]);

  const {state, dispatch} = useContext(Context);

  useEffect(() => {
    getUserChats()
  }, [])

  const getUserChats = () => {
    setUserChats(getUserChatList);
  };

  const onSelectChat = (chatUser) => {
      dispatch({
          type: CHAT_USER,
          payload: {
              chatUser: chatUser
          }
      })
  }

  return (
    <>
      <div className="profile-container">
        <Profile chatUser={state.user}/>
      </div>
      <div>
        <SearchBar />
      </div>
      <div style={{ border: "2px solid #d7dee0", height: '570px', overflowX: 'hidden', overflowY: 'auto', textAlign: 'justify' }}>
        {userChats.map((item) => (
          <ChatProfile 
            chatUsers={item}
            isSelected={item.id == state.chatUser.id}
            onSelectChat={onSelectChat}
          />
        ))}
      </div>
    </>
  );
};
