import { authorization } from '../test/authorization';
import { chatUser } from '../test/chatUser';
import { chats } from '../test/chats';
import { users } from '../test/users';
import Cookies from 'universal-cookie';
const API_ENABLED = false;
const API = '';
export const cookies = new Cookies();

export const signIn = (user) => {
    if (!API_ENABLED) return authorization;
};

export const signUp = (user) => {
    return ''
  };

export const getUserChatList = () => {
    if (!API_ENABLED) return chatUser;
};

export const getUsersList = (user) => {
    if (!API_ENABLED) return users;
}

export const getUserChats = (userId) => {
    if (!API_ENABLED) return chats;
}

export const validateUser = () => {
    if (!API_ENABLED) return {
        status: true,
        name: 'Saravanan Test',
        profilePic: ''
    };
}
