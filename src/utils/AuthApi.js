import axios from "axios";
import { refreshRes, refreshErrorHandle } from "./SilentTokenRefresh";


const Api = axios.create({
    baseURL: 'http://127.0.0.1:3000/',
    headers: {
        "content-type": "application/json"
    }
})

Api.interceptors.request.use(refreshRes, refreshErrorHandle);

export default Api;