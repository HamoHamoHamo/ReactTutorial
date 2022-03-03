import React, { useEffect } from "react";
import { Api, tokenRefresh } from "../utils/SilentTokenRefresh";
import { useAppContext } from "../store";
import layout from  "./AppLayout.module.css";

function AppLayout({ children }) {
    const { store : { refreshToken, accessToken } } = useAppContext();
    console.log("앱ㄹ잉아ㅜㅇㅅ", refreshToken, accessToken);
    Api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
    useEffect(()=>{
        console.log("APPLAYOUT, refresh token : ", Api.defaults.headers);
    },[])
    return (
        <>
            <div className={layout.container}>
                {children}
            </div>
        </>
    )
}

export default AppLayout;