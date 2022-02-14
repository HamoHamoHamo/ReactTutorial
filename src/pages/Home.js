import React, { useContext } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { useAppContext, reducer, AppContext } from "../store";
import Api from "../utils/AuthApi";

function First(props) {
    const { auth } = props;
    if (auth === true){
        return(
        <div class="body">
            <div>
                <Link to="/profile">프로필</Link>
            </div>
            <div>
                <Link to="/attendance">출석체크</Link>
            </div>
        </div>
        )
    }
    else{
        return (
            <div class="body">
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
    // console.log("홈 헤더", Api.defaults.headers);
    //const store = useContext(AppContext);
    //console.log("STORE", store);

    return (
        <div class="body">
            <First auth={isAuthenticated} />
        </div>
    )
}

export default Home;