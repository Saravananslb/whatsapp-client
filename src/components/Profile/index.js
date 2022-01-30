import React from "react";
import './profile.css'
const PROFILE_PIC = require('../../assets/profile.png')

export const Profile = (props) => {
    return (
        <div>
            <div>
                <img src={PROFILE_PIC} alt="profile pic" className="profile-pic"/>
                <span className="profile-name">{props.chatUser ? props.chatUser.name : ''}</span>
            </div>
            
        </div>
    );
}