import React, { useEffect, useState } from "react";
import { Api } from "../../utils/SilentTokenRefresh";
import styles from "./profile.module.css";

export default function Profile() {
    const [datas, setDatas] = useState({});

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
    useEffect(getData,[])
    
    let arr = Object.entries(datas);
    console.log("aarrr", arr);
    const dataList = arr.map(( [,a], index) => {
        console.log("asda",a['datetime'], index);
        const datetime = a['datetime'];
        const id = a['id'];
        return (
            <div className={`datetime${id}`} key={index}>{datetime}</div>
        )
    })
    // const dataList = datas.map((a)=>{
    //     console.log("aasdfs", a['datetime']);
    // })
    // useEffect(List(),[datas]);
    // function List() {
    //     if (datas){
    //         const dataList = datas.map(({ datetime, ip }) => {
    //             console.log("x", datetime, ip); 
    //         });
    //     }
    // }
    
    //map써서 데이터 갯수만큼 띄워주는거 해야됨
    return (
        <div>
            <div>오늘 출석체크 시간</div>
            <div className={styles.container}>
                {dataList}
            </div>
        </div>

    )
}