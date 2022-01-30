import { CHAT_USER, IS_AUTHENTICATE, USER_INFO } from "./action.types"

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
        default:
            return state;
    }
}