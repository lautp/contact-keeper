import React, {Children, useReducer} from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';

import {ADD_CONTACT,
        DELETE_CONTACT,
        UPDATE_CONTACT,
        FILTER_CONTACTS,
        CLEAR_FILTER,
        SET_CURRENT,
        CLEAR_CURRENT
} from '../types'

const ContactState = props => {
    const initialState = {
        contacts: [{
            id: 1,
            name: 'Jill Johnson',
            email: 'jill@gmail.com',
            phone: '111-111-1111',
            type: 'personal'

        },
        {
            id: 2,
            name: 'Sara Watson',
            email: 'sara@gmail.com',
            phone: '222-222-2222',
            type: 'personal'
            
        },
        {
            id: 3,
            name: 'Harry White',
            email: 'harry@gmail.com',
            phone: '333-333-3333',
            type: 'professional'
            
        }]
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    //Add contact

    //Update contact

    //Delete contact

    //Set current contact

    //Clear current contact

    //Filter Contacts

    //Clear filter

    return (
        <ContactContext.Provider
        value= {{
            contacts: state.contacts
        }}>
            { props.children }
        </ContactContext.Provider>
    );

};




export default ContactState;
