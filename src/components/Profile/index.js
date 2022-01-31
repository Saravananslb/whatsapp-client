import React from "react";
import './profile.css'
const PROFILE_PIC = require('../../assets/profile.png')

export const Profile = (props) => {
    console.log(props)
    return (
        <div>
            <div>
                <img src={props.chatUser.profilePic || PROFILE_PIC} alt="profile pic" className="profile-pic"/>
                <span className="profile-name">{props.chatUser ? props.chatUser.name : ''}</span>
            </div>
            
        </div>
    );
}