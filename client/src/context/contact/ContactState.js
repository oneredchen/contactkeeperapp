import React, {useReducer} from 'react';
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
    FILTER_CONTACTS,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from '../types';

const ContactState = props => {

    const initialState = {
        contacts: null,
        current : null,
        filtered: null,
        loading: true,
        error: null
    };

    //Dispatch is used to send objects to the reducer
    const [state,dispatch] = useReducer(ContactReducer, initialState);

    //Get Contacts
    const getContacts = async () =>{
        try {
            const res = await axios.get('api/contacts');
            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR, 
                payload: err.respond.msg
            });
        }
    };

    //Add Contact 
    const addContact = async (contact) =>{
        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        try {  
            const res = await axios.post('api/contacts', contact, config);
            dispatch({
                type: ADD_CONTACT, 
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR, 
                payload: err.respond.msg
            })
        }
    };

    //Delete Contact
    const deleteContact = async (id) =>{
        try {
            await axios.delete(`api/contacts/${id}`);
            dispatch({ 
                type: DELETE_CONTACT,
                payload: id
             }
        )
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR, 
                payload: err.respond.msg
            })   
        }
    };

    //Set Current Contact
    const setCurrent = (contact)=>{
        dispatch({type: SET_CURRENT, payload: contact});
    };

    //Clear Current Contact
    const clearCurrent=() =>{
        dispatch({type: CLEAR_CURRENT});
    };

    //Update Contact
    const updateContact =  async (contact) =>{
        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }   
        try{
            const res = await axios.put(`api/contacts/${contact._id}`, contact,config)
            dispatch({
                type: UPDATE_CONTACT, 
                payload: res.data
            })
        }catch (err) {
            dispatch({
                type: CONTACT_ERROR, 
                payload: err.respond.msg
            })   
        }   
    };
    //Filter Contacts
    const filterContacts = (text) =>{
        dispatch({type: FILTER_CONTACTS, payload: text})
    }
    //Clear Filter
    const clearFilter = () =>{
        dispatch({ type: CLEAR_FILTER })
    }
    //Clear Contacts
    const clearContacts =() =>{
        dispatch(
            { type: CLEAR_CONTACTS }
        )
    }

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            loading: state.loading,
            error: state.error,
            getContacts,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            clearContacts
        }}>
           {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;