import React, { useState } from "react";
import axios from "axios";
import  { Alert } from "antd";
import { useNavigate } from "react-router-dom";
// import Cookies from 'universal-cookie';
import { useAppContext, setToken } from "../../store";
import { Api } from "../../utils/SilentTokenRefresh";
import styles from "../../components/AppLayout.module.css";
import { IP } from '../../utils/SilentTokenRefresh';
import loginStyles from "./Login.module.css"

export default function Login() {
    const { dispatch } = useAppContext();
    let navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [fieldErrors, setFieldErrors] = useState({});

    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
        // console.log(inputs);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        async function fn() {
            setFieldErrors({});
            const URL = `${IP}login/`;
            console.log("URL", URL);
            const response = axios.post(URL, inputs)
            .then(response => {
                alert("로그인 완료");
                const {
                    data: { refresh_token: refreshToken, access_token: accessToken }
                } = response;
                console.log("로그인 완료 토큰", { refreshToken, accessToken });
                dispatch(setToken({ refreshToken }));
                Api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
                navigate("/");
            })
            .catch(error => {
                console.log("ERROR", error.response);
                if ( error.response ) {
                    const { data: fieldsErrorMessages } = error.response;
                    // fieldsErrorMessages = > { username : "m1 m2", password: [] }
                    setFieldErrors(
                        Object.entries(fieldsErrorMessages).reduce(
                            (acc, [fieldName, errors]) => {
                                acc[fieldName] = errors.join(" ")
                                
                                return acc;
                            },
                            {}
                        )
                    )
                    console.log("ERRRORS", fieldErrors);
                }
                
            });
            
            
            // .then(response => {
            //     alert("로그인 완료");
            //     console.log("response :", response);
            //     const {
            //         data: { refresh_token }
            //     } = response;
            //     console.log("TOKEN", refresh_token)

                
            //     let expires = new Date();
            //     expires.setTime(expires.getTime() + 5 * 60 * 1000);
            //     cookies.set('token', refresh_token, { 
            //         path: '/',
            //         expires: expires,
            //         secure: true,
            //         }
            //     );

            //     // navigate("/login");
            // })
            // .catch(error => {
            //     console.log("error :", error);
            //     console.log(error.response.data);
            //     if (error.response.data) {
            //         setErrors({
            //             username : (error.response.data.username || []).join(" "),
            //             password : (error.response.data.password || []).join(" "),
            //             etc_error : (error.response.data.non_field_errors || []).join(" "),
            //         });
            //     }
            // });
        }
        fn();

        
    }

    const onClick = () => {
        console.log("FIELDSERRORS",fieldErrors);
    }

    return (
        <div className={styles.center}>
            <h1 style={{color: "#40a9ff", fontSize: "40px", fontWeight: "bold"}}>로그인</h1>
            {fieldErrors.non_field_errors && <Alert type="error" message={fieldErrors.non_field_errors} />}
            <form style={{display:'flex'}} onSubmit={onSubmit}>
                <div>
                    <div>
                        {fieldErrors.username && <Alert type="error" message={fieldErrors.username} />}
                        <input className={loginStyles.input} type="text" placeholder="id" name="username" onChange={onChange} />
                    </div>
                    <div>
                        {fieldErrors.password && <Alert type="error" message={fieldErrors.password} />}
                        <input className={`${loginStyles.input} ${loginStyles.inputMiddle}`} type="password" placeholder="password" name="password" onChange={onChange} />
                    </div>
                </div>
                
                <input className={loginStyles.loginButton} style={{backgroundColor: "#40a9ff", color: 'white'}} type="submit" value="LOGIN" />
            </form>
        </div>
    )
}
