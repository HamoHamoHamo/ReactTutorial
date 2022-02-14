import React, { useEffect, useState } from "react";
import { useAppContext } from "../../store";
import Api from "../../utils/AuthApi";
import { instance } from "../../utils/SilentTokenRefresh";

export default function Attendance() {
    const [res, setRes] = useState(undefined);
    const{
        store: { refreshToken, accessToken }
    } = useAppContext();

    async function onClick(){
        try{
            console.log("헤더", Api.defaults.headers);
            
            const response = await instance.post('check/')
            // .then(res => {
            //     console.log("then resonse", res);
            //     setRes(res);
            // });
            console.log("출석체크 클릭", response);
        }
        catch(error){
            console.log("에러", error);
        }
        
        // axios.post('http://127.0.0.1:8000/check/')
        // .then(response => {
        //     console.log("response : ", response)
        // })
        // .catch(error => {
        //     console.log("error:", error)
        // });
    }
    // useEffect(()=>{
    //     console.log("asdfd", res);
    // },[res])
    return (
        <div>
            <button onClick={onClick}>출석체크</button>
        </div>
    )
}