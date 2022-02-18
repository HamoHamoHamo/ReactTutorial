import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext, deleteToken } from "../../store";
import { Api } from "../../utils/SilentTokenRefresh";

export default function Logout() {
    const { dispatch } = useAppContext();
    const { store : {refreshToken} } = useAppContext();
    useEffect(async() => {
        if (window.confirm("로그아웃")){
            try{
                const response = await Api.post('logout/', { refresh: refreshToken })
                console.log("logout response", response);
            }
            catch(error){
                console.log("로그아웃 에러", error);
            }
    
            dispatch(deleteToken());
        }    
    }, [])
    
    return <Navigate to="/" />;
}