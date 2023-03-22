import Axios from 'axios';
import url from './url';

const httpClient = Axios.create({
    baseURL: url,
});

export default httpClient;