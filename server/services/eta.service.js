const axios = require('axios');
const keys = require('../config/keys');
/**
 * Retrieves estimation data from the Posten API
 */
const getEta = (data) => {
    return axios.post(keys.apiUrl, { data: data }, {
        headers: {
            'Authorization': `Bearer ${keys.bearerToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
};

module.exports = {
    getEta
};