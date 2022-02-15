import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../store";
import { Api } from "../../utils/SilentTokenRefresh";

export default function Attendance() {
    const [res, setRes] = useState(undefined);
    const{
        store: { refreshToken, accessToken }
    } = useAppContext();

    async function onClick(){
        try{
            // const ipData = await fetch('https://geolocation-db.com/json/');
            // const locationIp = await ipData.json();
            const ipData = await axios.get('https://api.ipify.org?format=json');
            const { data: { ip } } = ipData
            console.log("IP", ip);

            const response = await Api.post('check/', { ip })
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