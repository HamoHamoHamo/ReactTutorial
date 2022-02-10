import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { useAppContext } from "../store";

function First(props) {
    const { auth } = props;
    console.log("로그인확인", auth)
    if (auth){
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


    return (
        <div class="body">
            <First auth={isAuthenticated} />
        </div>
    )
}

export default Home;