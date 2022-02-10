import React from "react";
import axios from "axios";
import { useAppContext } from "../../store";

export default function Attendance() {
    // axios.defaults.xsrfHeaderName = "X-CSRFToken";
    // axios.defaults.xsrfCookieName = 'csrftoken';
    // axios.defaults.withCredentials = true

    const{
        store: { refreshToken }
    } = useAppContext();
    console.log(refreshToken);
    const onClick = () => {
        axios.post('http://127.0.0.1:8000/token/verify/', {"token":refreshToken})
        .then(response => {
            console.log("response : ", response)
        })
        .catch(error => {
            console.log("error:", error)
        });
    }

    return (
        <div>
            <button onClick={onClick}>출석체크</button>
        </div>
    )
}