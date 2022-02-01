import { CHAT_USER, IS_AUTHENTICATE, USER_INFO, ENABLE_CONTACT, SET_TEMP_CONTACT, SET_CONTACT, ADD_CHAT } from "./action.types"

export const reducer = (state, action) => {
    switch(action.type) {
        case CHAT_USER:
            return {
                ...state,
                chatUser: action.payload.chatUser
            }
        case IS_AUTHENTICATE:
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated
            }
        case USER_INFO:
            return {
                ...state,
                user: action.payload.user
            }
        case ENABLE_CONTACT:
            return {
                ...state,
                contactEnabled: action.payload.isEnabled
            }
        case SET_CONTACT:
            return {
                ...state,
                userContacts: action.payload.userContacts
            }
        case SET_TEMP_CONTACT:
            return {
                ...state,
                userContactsTemp: action.payload.userContactsTemp
            }
        case ADD_CHAT:
            return {
                ...state,
                chats: {
                ...state.chats,
                ...action.payload,
                },
            };
        default:
            return state;
    }
}