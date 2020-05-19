import React, {useReducer} from 'react';
import {v4 as uuid} from 'uuid';
import axios from 'axios';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer'
import {
    ADD_CONTACT, 
    DELETE_CONTACT,
    UPDATE_CONTACT,
    SET_CURRENT,
    CLEAR_FILTER,
    CLEAR_CURRENT,
    FILTER_CONTACTS
} from '../types';

const ContactState = props => {

    const initialState = {
        contacts: [
            {
                id:1,
                name: 'Weiyang',
                email: 'weiyang@exxon.com',
                phone: '1111 1111 1111',
                type: 'professional'
            },
            {
                id:2,
                name: 'Junqi',
                email: 'junqi@darktrace.com',
                phone: '2222 2222 2222',
                type: 'personal'
            },
            {
                id:3,
                name: 'Sihan',
                email: 'Sihan@exxon.com',
                phone: '3333 3333 3333',
                type: 'professional'
            },
        ],
    };

    //Dispatch is used to send objects to the reducer
    const [state,dispatch] = useReducer(ContactReducer, initialState);

    //Add Contact 
    const addContact = (contact) =>{
        contact.id = uuid();
        dispatch({type:ADD_CONTACT, payload: contact});
    }
    //Delete Contact

    //Set Current Contact

    //Clear Current Contact

    //Update Contact

    //Filter Contacts

    //Clear Filter

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            addContact
        }}>
           {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;