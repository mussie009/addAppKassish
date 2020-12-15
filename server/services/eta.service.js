const axios = require('axios');
const { API_URL, BEARER_TOKEN } = require('../config/posten');

const getEta = (data) => {
    return axios.post(API_URL, { data: data }, {
        headers: {
            'Authorization': `Bearer ${BEARER_TOKEN}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
};

module.exports = {
    getEta
};