import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useAppContext, reducer, AppContext } from "../store";
import { Api } from "../utils/SilentTokenRefresh"

function First(props) {
    const [datas, setDatas] = useState({});

    const { auth } = props;
    async function getData() {
        console.log("HEADER", Api.defaults.headers);
        try{
            const response = await Api.get('/accounts/profile/')
            console.log("response", response);
            const { data: { name } }= response
            const { data: { username } }= response
            setDatas((prev) => ({
                ...prev,
                name,
                username
            }))
            console.log("name",datas)
        }
        catch(error){
            console.log("에러", error);
        }
    }
    useEffect(() => {
        if(auth === true) {
            
            getData();
        }
    },[])

    if (auth === true){
        return(
            <div className={styles.header}>
                <div>{datas.name}</div>
                <div>                    
                    <Link to="/profile">프로필</Link>
                </div>
                <div>
                    <Link to="/attendance">출석체크</Link>
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

function Home() {
    const { store : {isAuthenticated} } = useAppContext();
    console.log("인증 >", isAuthenticated)
    //const store = useContext(AppContext);
    //console.log("STORE", store);

    if (!isAuthenticated){
        return (
            <div>            
                <First auth={isAuthenticated} />
            </div>
        )
    }
    return (
        <div className={styles.body}>
            
            <First auth={isAuthenticated} />
            

            <div >
                table
            </div>
        </div>
    )
}

export default Home;