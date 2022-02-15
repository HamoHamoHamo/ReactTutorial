import React, { useEffect, useState } from "react";
import { Api } from "../../utils/SilentTokenRefresh";
import styles from "./profile.module.css";

export default function Profile() {
    const [datas, setDatas] = useState({});
    let name = ''

    async function getData() {
        try{
            const response = await Api.get('/accounts/profile/')
            // console.log("response", response);
            const { data: { name } }= response
            const { data: { username } }= response
            setDatas({
                name,
                username
            })
            console.log("name",datas)
        }
        catch(error){
            console.log("에러", error);
        }
    }
    useEffect(getData,[]);

    return (
        <div>
            <div>PROFILE</div>
            <div className={styles.container}>
                <div>이름 : { datas.name }</div>
                <div>id : { datas.username }</div>
            </div>
        </div>

    )
}