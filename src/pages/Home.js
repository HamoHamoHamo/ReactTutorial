import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useAppContext } from "../store";
import { Api } from "../utils/SilentTokenRefresh";
import { parsingDataList, createList } from "../utils/ParsingData";

function First(props) {
    const { auth } = props;
    
    if (auth === true){
        return(
            <div className={styles.header}>
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

    const date = new Date();
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    const thisMonth = month < 10 ? `${year}-0${month}` : `${year}-${month}`;
    // console.log("MONTH", thisMonth);
    //const store = useContext(AppContext);
    //console.log("STORE", store);
    const [datas, setDatas] = useState({});
    const [monthly, setMonth] = useState(thisMonth);
    

    async function getData(month) {
        console.log("HEADER", Api.defaults.headers);
        try{
            const response = await Api.get(`check/monthly/${month}`)
            console.log("response", response);
            const { data }= response
            setDatas(data)
            
        }
        catch(error){
            console.log("에러", error);
        }
    }
    useEffect(() => {
        if(isAuthenticated === true) {
            
            getData(monthly);
        }
    },[monthly])
    // console.log("DATAS", datas)
    
    // const result = parsingDataList(datas);
    // console.log("RESULT", result)
    // const personDataList = createList(result);
    function prevMonth() {
        let prevMon = new Date(monthly)
        prevMon.setMonth(prevMon.getMonth() - 1);
        const m = prevMon.getMonth()+1;
        const y = prevMon.getFullYear();
        console.log("PRRE", m, y);
        setMonth(() => {
            return m < 10 ? `${y}-0${m}` : `${y}-${m}`
            
        });
    }
    function nextMonth() {
        let nextMon = new Date(monthly)
        nextMon.setMonth(nextMon.getMonth() + 1);
        const m = nextMon.getMonth()+1;
        const y = nextMon.getFullYear();
        console.log("NEXT", m, y);
        setMonth(() => {
            return m < 10 ? `${y}-0${m}` : `${y}-${m}`
            
        });
    }

    function onChange(e) {
        const { value } = e.target
        setMonth(value);
        console.log("VLAU", value);
    }

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
                <div className={styles.middleHeader}>
                    <input type="month" value={monthly} onChange={onChange} />
                    <a className={styles.monthChange} onClick={prevMonth}>◀</a>
                    {monthly} 출퇴근 시간
                    <a className={styles.monthChange} onClick={nextMonth}>▶</a>
                </div>
                <div className={styles.attendanceContainer}>
                    {createList(parsingDataList(datas))}
                </div>
            </div>
        )
    }
    
}