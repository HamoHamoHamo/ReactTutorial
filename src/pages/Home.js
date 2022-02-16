import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useAppContext, reducer, AppContext } from "../store";
import { Api } from "../utils/SilentTokenRefresh"

function First(props) {
    

    const { auth } = props;
    

    if (auth === true){
        return(
            <div className={styles.header}>
                <div>                    
                    <Link to="/profile">오늘 출퇴근시간</Link>
                </div>
                <div>
                    <Link to="/attendance">출퇴근체크</Link>
                </div>
                <div>
                    <Link to="/logout">로그아웃</Link>
                </div>
            </div>
        )
    }
    else{
        return (
            <div className={styles.notlogin}>
                <div>
                    <Link to="/login">로그인</Link>
                </div>
                <div>
                    <Link to="/signup">회원가입</Link>
                </div>
            </div>
        )
    }
}

export default function Home() {
    const { store : {isAuthenticated} } = useAppContext();
    console.log("인증 >", isAuthenticated)
    //const store = useContext(AppContext);
    //console.log("STORE", store);
    const [datas, setDatas] = useState({});
    

    async function getData() {
        console.log("HEADER", Api.defaults.headers);
        try{
            const response = await Api.get('/check/list/')
            console.log("response", response);
            console.log("is array?", Array.isArray(response.data))
            const { data }= response
            setDatas(data)
            
        }
        catch(error){
            console.log("에러", error);
        }
    }
    useEffect(() => {
        if(isAuthenticated === true) {
            
            getData();
        }
    },[])
    // console.log("DATAS", datas)
    const arr = Object.entries(datas)

    // console.log("datalist", Array.isArray(datas), arr);
    // const dataList = arr.map(([,data], index) => {
    //     const { id, user, datetime, ip } = data
    //     return (
    //         <div key={index}>
    //             <span>{id}  </span>
    //             <span>{user}  </span>
    //             <span>{datetime}  </span>
    //             <span>{ip}  </span>
                
    //         </div>
    //     )
    // })
    let curUser = ''
    let curArr = []
    const result = arr.reduce(
        (acc, [, data], index, arr) => {
            const { id, user, datetime, ip } = data
            if(index===0){
                curUser = user
            }
            if(curUser !== user || arr.length === index+1){
                console.log("aaaaaaaaaaaa",user)
                acc[curUser] = curArr
                curUser = user
                curArr = []
            }

            const attendance = {
                id, user, datetime, ip
            }
            curArr.push(attendance)
            return acc;
        },
        {}
    )
    console.log("RESULT", result)
    const personDataList = Object.entries(result).map(([name,data], index) => {
        console.log("dsfsffsdf", data);
        const personData = Object.entries(data).map(([,data], index) => {
            const { datetime, ip } = data
            console.log("aASDFAFD", datetime, ip)
            return <div key={index}>{datetime}</div>
        })

        // return Object.entries(data).map(([,data]) => {
        //     const { datetime, ip } = data
        //     console.log("aASDFAFD", datetime, ip)
        //     return (
        //         <div>
        //             <span>{name}</span>
        //             <div>{datetime}</div>
        //         </div>
        //     )
        // })
        
        return (
            <div key={index}>
                <span>{name}</span>
                {personData}
            </div>
        )

    })
    

    if (!isAuthenticated){
        return (
            <div>            
                <First auth={isAuthenticated} />
            </div>
        )
    }else{
        return (
            <div className={styles.body}>
                
                <First auth={isAuthenticated} />
                <div className={styles.attendanceContainer}>
                    {personDataList}
                </div>
            </div>
        )
    }
    
}