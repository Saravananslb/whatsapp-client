import React, { useContext, useEffect, useState } from "react";
import "./chatArea.css";
import { SendIcon } from "../../components/SendIcon";
import { Profile } from "../../components/Profile";
import { Chats } from "../../components/Chats";
import { Context } from "../../store/Context";
import { getUserChats } from "../../services/apiCall";

export const ChatArea = () => {
  const [message, setMessage] = useState("");

  const [userChats, setUserChats] = useState([]);
  
    const { state, dispatch } = useContext(Context);

    useEffect(()=> {
        getChats();
    })

    const getChats = () => {
        const userId = state.chatUser.id;
        const chats = getUserChats(userId)
        setUserChats(chats);
    }

  return (
    <div className="chat-area-container">
      <div style={{ background: "#F0F2F5", padding: "10px" }}>
        <Profile chatUser={state.chatUser} />
      </div>
      <div className="chats-background-container">
        <Chats userChats={userChats} chatUser={state.chatUser} />
      </div>
      <div className="message-type-container">
        <form>
          <input
            type="text"
            placeholder="Type a message"
            style={{ width: "90%", padding: "10px" }}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {message ? <SendIcon /> : null}
        </form>
      </div>
    </div>
  );
};
