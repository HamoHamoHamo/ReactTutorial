import React, { createContext, useContext, useEffect } from "react";
import useReducerWithSideEffects, { UpdateWithSideEffect, Update } from "use-reducer-with-side-effects";
import Cookies from 'universal-cookie';
// import { silentRefresh } from "./utils/SilentTokenRefresh"; //불러오면 화면 안뜸

const initialState = {
    refreshToken: "",
};

const cookies = new Cookies();

export const AppContext = createContext(initialState);

export const reducer = (prevState, action) => {
    const { type } = action;
    if ( type === SET_TOKEN ) {
        const { payload } = action;
        const { refresh_token: refreshToken } = payload
        const newState = {...prevState, refreshToken, isAuthenticated: true};
        return UpdateWithSideEffect(newState, (state, dispatch) => {
            cookies.set('token', refreshToken, { 
                path: '/',
                expires: '',
                secure: true,
                //httpOnly: true, httpOnly 옵션은 ie 브라우져를 쓰거나 .com 등으로 끝나는 일반적인 도메인에만 적용가능하다.
                }
            );
        });
    } else if ( type === DELETE_TOKEN ) {
        const newState = {...prevState, refreshToken: "", isAuthenticated: false};
        
        return UpdateWithSideEffect(newState, (state, dispatch) => {
            cookies.set('token', '', {expires: -1});
        });
        
    }
    return prevState;
}

export const AppProvider = ({ children }) => {
    const refreshToken = cookies.get('token');
    const [store, dispatch] = useReducerWithSideEffects(reducer, {
        refreshToken,
        isAuthenticated: refreshToken ? true : false,
    });
    useEffect(()=>{
        console.log("EFFECT");
    },[])
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