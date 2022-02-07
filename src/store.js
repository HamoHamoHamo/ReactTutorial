import React, { createContext, useContext, useReducer } from "react";
import Cookies from 'universal-cookie';

const initialState = {
    refreshToken: "",
};

const cookies = new Cookies();

const AppContext = createContext(initialState);

const reducer = (prevState, action) => {
    const { type } = action;
    if ( type === SET_TOKEN ) {
        const { payload: refreshToken } = action;
        return {
            ...prevState,
            refreshToken,
        };
    }
    else if ( type === DELETE_TOKEN ) {
        const { payload: refreshToken } = action;
        return {
            ...prevState,
            refreshToken : "",
        };
        
    }
    return prevState;
}

export const AppProvider = ({ children }) => {
    const [store, dispatch] = useReducer(reducer, null, () => ({
        refreshToken: cookies.get('token')
    }));
    return (
        <AppContext.Provider value={{ store, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

// Actions
const SET_TOKEN = "APP/SET_TOKEN";
const DELETE_TOKEN = "APP/DELETE_TOKEN";

// Action Creators
export const setToken = token => ({ type: SET_TOKEN, payload: token });
export const deleteToken = () => ({ type: DELETE_TOKEN });
