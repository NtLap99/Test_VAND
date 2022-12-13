import axios from "axios"

const axiosClientV2 = axios.create({
    baseURL: process.env.REACT_APP_API_URL_V2,
})

export default axiosClientV2;