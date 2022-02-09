import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

import axios from "axios";



function Home() {
    // const getCookie = name => {
    //     var cookieValue = null;
    //     if (document.cookie && document.cookie !== '') {
    //         var cookies = document.cookie.split(';');
    //         for (var i = 0; i < cookies.length; i++) {
    //             var cookie = cookies[i].replace(' ', '');
    //           //var cookie = jQuery.trim(cookies[i]); 당신이 만약 jQuery를 사용한다면, 위 코드 대신 이 코드를 사용하여도 좋다
    //             if (cookie.substring(0, name.length + 1) === (name + '=')) {
    //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
    //                 break;
    //             }
    //         }
    //     }
    //     return cookieValue;
    // }


    // const onClick = () => {
    //     axios.defaults.xsrfCookieName = 'csrftoken'; 
    //     axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    //     const response = axios.get('http://127.0.0.1:8000/accounts/csrftoken/', '')
    //         .then(response => {
    //             console.log(response.data);
    //             console.log("COOKIE :", document.cookie);
    //         })
    //         .catch(error => {
    //             console.log("ERROR", error)
    //         })
    // }

    return (
        <div class="body">
            <div>
                <input name="id" class="id" placeholder="id"/>
                <input name="password" class="password" placeholder="pw"/>
                <button>login</button>
                <button>test</button>
            </div>
            <div>
                <Link to="/signup">signup</Link>
            </div>
        </div>
    )
}

export default Home;