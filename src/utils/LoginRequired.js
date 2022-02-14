import React from "react";
import { Navigate, Outlet } from "react-router-dom"
import { useAppContext } from "../store";

export default function LoginRequired({ element, ...kwargs }) {
    console.log("WHAT", element, kwargs);
    const{
        store: { isAuthenticated }
    } = useAppContext();
    console.log("isAuthenticated :", isAuthenticated);
    if (isAuthenticated === false){
        return <Navigate to="/login" />;
    }
    return <Outlet />
}

// export default function LoginRequiredRoute({ element, ...kwargs }) {
//     const{
//         store: { isAuthenticated }
//     } = useAppContext();
//     console.log("isAuthenticated :", isAuthenticated);

//     return <Route {...kwargs} element={element} />;
    
// }