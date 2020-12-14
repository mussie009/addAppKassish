import axios from 'axios';

const API_TOKEN = process.env.REACT_APP_API_TOKEN;
const API_URL = process.env.REACT_APP_API_URL;

const getEta = (data) => {
    return axios.post(API_URL, { data: data }, {
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
};

const etaService = {
    getEta
}

export default etaService;