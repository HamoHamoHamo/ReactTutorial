import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../store";
import LoginRequired from "../../utils/LoginRequired";
import { Api } from "../../utils/SilentTokenRefresh";
import styles from "./Attendance.module.css"
import "./test";


export default function Attendance() {
    const [datas, setDatas] = useState({});
    const [reload, setReload] = useState(0)

    const getData = async () => {
        
        const response = await Api.get('/check/profile/')
        console.log("response", response);
        const { data } = response;
        console.log("DATAAA", data);
        setDatas(data);
        
        // data.map(({ datetime, ip }) => {
        //     // console.log("x", datetime, ip);
        //     setDatas(prev => ({
        //         ...prev,
        //         datetime,
        //         ip
        //     }))
        // });
        
    }
    useEffect(getData,[reload])

    const clickDelete = async (id) => {
        if(window.confirm("삭제하시겠습니까?")){
            try{
                const response = await Api.delete(`check/${id}/`)
                console.log("삭제 성공", response);
                setReload((prev)=> prev+1);
            }
            catch(error){
                console.log("Delete Error", error);
            }
        }
    }
    
    let arr = Object.entries(datas);
    console.log("aarrr", arr);
    const dataList = arr.map(( [,a], index) => {
        console.log("asda",a['datetime'], index);
        const {datetime, ip, id} = a
        return (
            <div className={styles.text} key={index}>
                <span>{datetime} / IP: {ip}</span>
                <input onClick={()=>{clickDelete(id)}} type="button" className={styles.del} value="X" />
            </div>
        )
    })
    

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
            console.log("출퇴근 체크 클릭", response);
            alert(`출퇴근 체크 완료\nip: ${ip}`)
            setReload((prev)=> prev+1);

        }
        catch(error){
            console.log("출첵 에러", error);
            LoginRequired()
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
        <div className={styles.center}>
            <div className={styles.warning}>한번만 누르세요</div>
            <button onClick={onClick}>출퇴근 체크</button>
            <div className={styles.container}>
                <div className={styles.title}>오늘 출퇴근 체크 시간</div>
                {dataList}
            </div>
        </div>
    )
}