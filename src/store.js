import React, { createContext, useContext } from "react";
import useReducerWithSideEffects, { UpdateWithSideEffect, Update } from "use-reducer-with-side-effects";
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
        const newState = { ...prevState, refreshToken };
        return UpdateWithSideEffect(newState, (state, dispatch) => {
            cookies.set('token', refreshToken, { 
                path: '/',
                expires: '',
                secure: true,
                }
            );
        });
    } else if ( type === DELETE_TOKEN ) {
        const newState = {...prevState, refreshToken : ""};
        
        return UpdateWithSideEffect(newState, (state, dispatch) => {
            cookies.set('token', '', {expires: -1});
        });
        
    }
    return prevState;
}

export const AppProvider = ({ children }) => {
    const [store, dispatch] = useReducerWithSideEffects(reducer, {
        refreshToken: cookies.get('token', '')
    });
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