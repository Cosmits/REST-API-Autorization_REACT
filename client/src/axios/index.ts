import axios, {AxiosRequestConfig} from "axios";

export const BASE_URL = 'http://localhost:5000'

export const myAxiosConfig = {
    withCredentials: true,
    baseURL: BASE_URL,
    headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
}

const instanceAxios = axios.create(myAxiosConfig)


// Add a request interceptor
instanceAxios.interceptors.request.use(function (config: AxiosRequestConfig) {
    // Do something before request is sent

    // // //@ts-ignore
    // // config.headers['Access-Control-Allow-Headers'] = '*'
    // //@ts-ignore
    // config.headers['Access-Control-Allow-Origin'] = BASE_URL
    // //@ts-ignore
    // config.headers['Access-Control-Allow-Credentials'] = true
    // //@ts-ignore
    // // config.headers['Content-Type'] = 'application/json'
    // //@ts-ignore
    // config.headers["Access-Control-Allow-Methods"] = "PUT, POST, PATCH, DELETE, GET"

    // if (localStorage.getItem('AccessToken')) {
    //@ts-ignore
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('AccessToken')}`;
    //@ts-ignore
    config.headers.Authorization = `Bearer ${localStorage.getItem("AccessToken")}`
    // }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instanceAxios.interceptors.response.use(function (response: AxiosRequestConfig) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // //@ts-ignore
    // response.headers['Access-Control-Allow-Origin'] = BASE_URL
    // //@ts-ignore
    // response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'

    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});


export default instanceAxios
