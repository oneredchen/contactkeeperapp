import {
    ADD_CONTACT, 
    DELETE_CONTACT,
    UPDATE_CONTACT,
    SET_CURRENT,
    CLEAR_FILTER,
    CLEAR_CURRENT,
    FILTER_CONTACTS
} from '../types';

export default function (state, action){
    switch (action.type){
        case ADD_CONTACT:
            return{
                ...state,
                contacts:[...state.contacts, action.payload]
            };
        default:
            return state;
    }
}