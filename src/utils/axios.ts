import Axios, { AxiosError } from 'axios';
import url from './url';
import AsyncStorage from '@react-native-async-storage/async-storage';


const httpClient = Axios.create({
    baseURL: url,
});

httpClient.interceptors.request.use(async(config) => {
    console.log(config.headers);
    const token = await AsyncStorage.getItem('token')
    config.headers!['content-type'] = 'application/json';
    if (token === null) {
        return config;
    }
    config.headers!['authorization'] = `Bearer ${token}`;
    return config;
},  error => {
    return Promise.reject(error)
}); 

httpClient.interceptors.response.use(function(data) {
    return data;
}, async function(error: AxiosError<any, any>) {
    
    if (!error.response) {
        return Promise.reject(error.message);
    } else {
        if (error.response?.data.message instanceof Array) {
            const msg = error.response?.data.message as Array<any>;        
            return Promise.reject(JSON.stringify(msg));
        } else {
            if (error.response?.status === 401 || error.response?.status === 403) {
                await AsyncStorage.setItem('token', '')
            }
            return Promise.reject(error.response.data.message);
        }
    }
});

export default httpClient;