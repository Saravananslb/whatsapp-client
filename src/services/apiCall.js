import { authorization } from '../test/authorization';
import { chatUser } from '../test/chatUser';
import { chats } from '../test/chats';
import { users } from '../test/users';
import Cookies from 'universal-cookie';
import axios from 'axios';
const API_ENABLED = false;
export const cookies = new Cookies();

axios.defaults.baseURL = 'http://localhost:8000';

export const signIn = async(user) => {
    // if (!API_ENABLED) return authorization;
    return await axios.post('/signin', user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
};

export const signUp = async(user) => {
    return await axios.post('/signup', user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
  };

export const validateToken = async() => {
    return await axios.get('/getprofile', {
        headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + cookies.get('Authorization')
        }
    })
};

export const uploadImage = async(formData) => {
    return await axios.post('/upload', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export const addContactUser = async(contact) => {
    return await axios.put('/setuser', contact , {
        headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + cookies.get('Authorization')
        }
    })
}

export const getUserChatList = () => {
    if (!API_ENABLED) return chatUser;
};

export const getUsersList = async(number) => {
    return await axios.get(`/getuser?contactNumber=${number}`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + cookies.get('Authorization')
        }
    })

}

export const getUserChats = async(recieverId) => {
    // if (!API_ENABLED) return chats;
    return await axios.get(`/conversation/reciever/${recieverId}`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + cookies.get('Authorization')
        }
    })
}


export const getContactsUser = async(contact) => {
    return await axios.post('/getcontact', contact, {
        headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + cookies.get('Authorization')
        }
    })
  };
