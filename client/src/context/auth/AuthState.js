import React, {Children, useReducer} from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types'

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    //Load User

    //Register User
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }

    //Login User

    //Logout

    //Clear Errors

    return (
        <AuthContext.Provider
        value= {{
            token: state.token,
            isAuthenticated: state.isAuthenticated, 
            loading: state.loading,
            user: state.user,
            error: state.error
        }}>
            { props.children }
        </AuthContext.Provider>
    );

};




export default AuthState;