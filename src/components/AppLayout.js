import React, { useEffect } from "react";
import { Api, tokenRefresh } from "../utils/SilentTokenRefresh";
import { useAppContext } from "../store";

function AppLayout({ children }) {
    const { store : { refreshToken } } = useAppContext();
    const access = tokenRefresh(refreshToken);
    Api.defaults.headers['Authorization'] = `Bearer ${access}`;
    useEffect(()=>{
        console.log("APPLAYOUT, refresh token : ", refreshToken);
    },[])
    return (
        <>
            <div style={{
                display: "flex",
                width: "100vw",
                justifyContent: "center",
                height: "100vh",
                alignItems: "center",
                fontSize: "24px"
            }}>
            {children}
            </div>
        </>
    )
}

export default AppLayout;