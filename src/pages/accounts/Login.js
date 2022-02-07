import React, { useState } from "react";
import Axios from "axios";
import  { Alert } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';


export default function Login() {
    const cookies = new Cookies();
    
    
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});

    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
        // console.log(inputs);
    };

    



    const onSubmit = (e) => {
        const signupURL = "http://127.0.0.1:8000/login/"
        e.preventDefault();
        setErrors({});

        Axios.post(signupURL, inputs)
            .then(response => {
                alert("로그인 완료");
                console.log("response :", response);
                const {
                    data: { refresh_token }
                } = response;
                console.log("TOKEN", refresh_token)

                
                let expires = new Date();
                expires.setTime(expires.getTime() + 5 * 60 * 1000);
                cookies.set('token', refresh_token, { 
                    path: '/',
                    expires: expires,
                    secure: true,
                    }
                );

                // navigate("/login");
            })
            .catch(error => {
                console.log("error :", error);
                console.log(error.response.data);
                if (error.response.data) {
                    setErrors({
                        username : (error.response.data.username || []).join(" "),
                        password : (error.response.data.password || []).join(" "),
                        etc_error : (error.response.data.non_field_errors || []).join(" "),
                    });
                }
            });
    }

    const onClick = () => {
        console.log("COOKIE", cookies.get('cookie'));
    }

    return (
        <div style={{display: "flex", flexDirection:"column",}}>
            <h1>로그인</h1>
            {errors.etc_error && <Alert type="error" message={errors.etc_error} />}
            <form onSubmit={onSubmit}>
                <div>
                    {errors.username && <Alert type="error" message={errors.username} />}
                    <input type="text" placeholder="id" name="username" onChange={onChange} />
                </div>
                <div>
                    {errors.password && <Alert type="error" message={errors.password} />}
                    <input type="password" placeholder="password" name="password" onChange={onChange} />
                </div>
                <input type="submit" value="login" />
            </form>
            <button onClick={onClick}>test</button>
        </div>
    )
}
