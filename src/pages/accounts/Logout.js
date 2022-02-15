import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext, deleteToken } from "../../store";

export default function Logout() {
    const { dispatch } = useAppContext();

    if (window.confirm("로그아웃")){
        console.log("yes");
        dispatch(deleteToken());
    }
    return <Navigate to="/" />;
}