import axios from 'axios';
import { API_URL } from '../configs/env';

const getEta = (data) => {
    return axios.post("/estimer", { data: data });
};

const etaService = {
    getEta
}

export default etaService;