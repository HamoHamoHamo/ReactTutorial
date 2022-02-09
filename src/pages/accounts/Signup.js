import React, { useState } from "react";
import Axios from "axios";
import  { Alert } from "antd";
import { Link, useNavigate } from "react-router-dom";


// 아래를 넣으면 network error가 뜨고, 이걸 빼면 403에러가뜸
// 아래를 넣으면 더 앞부분에서 막힘 
// Axios.defaults.xsrfHeaderName = "X-CSRFToken";
// Axios.defaults.xsrfCookieName = 'csrftoken';
// Axios.defaults.withCredentials = true



export default function Signup() {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    let navigate = useNavigate();
    
    

    const onSubmit = (e) => {
        const signupURL = "http://127.0.0.1:8000/registration/"
        e.preventDefault();

        setErrors({});
        
        
        Axios.post(signupURL, inputs)
            .then(response => {
                alert("회원가입 완료");
                console.log("response :", response);
                navigate("/login");
            })
            .catch(error => {
                console.log("error :", error);
                console.log(error.response.data);
                if (error.response.data) {
                    setErrors({
                        username : (error.response.data.username || []).join(" "),
                        name : (error.response.data.name || []).join(" "),
                        password1 : (error.response.data.password1 || []).join(" "),
                        password2 : (error.response.data.password2 || []).join(" "),
                        etc_error : (error.response.data.non_field_errors || []).join(" "),
                    });
                }
            });
    }
    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
        // console.log(inputs);
    };
    const flexStyle = {
        display: "flex",
        fontSize: "20px",
        height: "30px",
        justifyContent: "left"
    }
    const marginStyle = {
        marginRight: "20px",
        fontWeight: "bold",
        width: "200px"
    }
    return (
        <div>
            <div style={{fontSize: "30px", fontWeight: "bold", marginBottom: "50px"}}>회원가입</div>
            {errors.etc_error && <Alert type="error" message={errors.etc_error} />}
            <form onSubmit={onSubmit}>
                <div style={flexStyle}>
                    <div style={marginStyle}>ID</div>
                    <input type="text" name="username" onChange={onChange} placeholder="id" />
                    {errors.username && <Alert type="error" message={errors.username} />}
                </div>
                <div style={flexStyle}>
                    <div style={marginStyle}>비밀번호</div>
                    <input type="password" name="password1" onChange={onChange} placeholder="password1"/>
                    {errors.password1 && <Alert type="error" message={errors.password1} />}
                </div>
                <div style={flexStyle}>
                    <div style={marginStyle}>비밀번호 확인</div>
                    <input type="password" name="password2" onChange={onChange} placeholder="password2"/>
                    {errors.password2 && <Alert type="error" message={errors.password2} />}
                </div>
                <div style={flexStyle}>
                    <div style={marginStyle}>이름</div>
                    <input type="text" name="name" onChange={onChange} placeholder="name"/>
                    {errors.name && <Alert type="error" message={errors.name} />}
                </div>
                <input type="submit" value="회원가입" />
            </form>
        </div>
    )
}