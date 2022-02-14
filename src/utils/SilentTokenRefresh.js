import React, { useContext, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import Cookies from 'universal-cookie';


const cookies = new Cookies();

// const refreshRes = (req) => {
//     // console.log("REFRESH", req);
//     // const refreshToken = cookies.get('token');
//     // const expiredTime = cookies.get('expiredTime');
    
//     // if (Date.now() > expiredTime && refreshToken){
//     //     console.log("SILENT REFRESH");
//         silentRefresh(req);
//     // }
     
//     return req;
// }

// const silentRefresh = async (req) => {
//     const refreshToken = cookies.get('token');
//     try{
//         console.log("REQ", req);
//         const response = await axios.post('http://localhost:8000/token/refresh/', { refresh: refreshToken })
//         const { data :{ access }} = response;
//         req.headers['Authorization'] = `Bearer ${access}`;
//         // console.log ("Success refresh", response);
        
//         let expiredTime = new Date();
//         expiredTime.setTime(expiredTime.getTime() + 5 * 60 * 1000); // 5분후 만료
//         cookies.set('expiredTime', expiredTime, {
//             path: '/',
//             expires: expiredTime
//         });
//     }
//     catch(error){
//         console.log("refresh token error : ", error);

//     }
//     return req;
// }


// const refreshErrorHandle = (err) => {
//     console.log("err", err);
//     return err;
// }

export { Api, tokenRefresh };

const Api = axios.create({
    baseURL: 'http://127.0.0.1:3000/',
    headers: {
        "content-type": "application/json"
    }
})

Api.interceptors.response.use(response => {
    
    console.log("request success");
    return response;
    }, err => {
        return new Promise(async(resolve,reject) => {
            //
            const refreshToken = cookies.get('token');
            console.log("RESPOSNE ERR", err);
            const originalReq = err.config;
            // console.log("originalReq", originalReq)

            if ( err.response.status === 403 && err.config && !err.config.__isRetryRequest )
            {   
                originalReq._retry = true;
                const access = await tokenRefresh(refreshToken)
                console.log("GET ACCESS", access);

                
                originalReq.headers['Authorization'] = `Bearer ${access}`;
                
                // console.log("TEST", Api.defaults.headers);
                // console.log("ORIGINAL", originalReq);

                await axios(originalReq)
                .then(originalRes => {
                    console.log("ORIGINALRES", originalRes);
                    resolve(originalRes);
                })
                .catch(err => {
                    console.log("original err", err);
                });


                // console.log("RESOLVE");
                // resolve(res);
            }


        reject(err);
    });
});

async function tokenRefresh(refreshToken){
    let access = ''
    let res = await fetch('http://localhost:8000/token/refresh/', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify({
            refresh: refreshToken
            
        }),
    }).then(res => res.json()).then(res => {
        // console.log("RES", res);
        access = res.access;
        Api.defaults.headers['Authorization'] = `Bearer ${access}`;
    });
    return access
};