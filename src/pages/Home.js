import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { useAppContext } from "../store";


function Home() {
    const { store } = useAppContext();
    console.log("STORE>", store)
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

export default Home;