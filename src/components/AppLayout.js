import React, { useEffect } from "react";
import { Api, tokenRefresh } from "../utils/SilentTokenRefresh";
import { useAppContext } from "../store";
import layout from  "./AppLayout.module.css";

function AppLayout({ children }) {
    const { store : { refreshToken } } = useAppContext();
    const access = tokenRefresh(refreshToken);
    Api.defaults.headers['Authorization'] = `Bearer ${access}`;
    useEffect(()=>{
        console.log("APPLAYOUT, refresh token : ", refreshToken);
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