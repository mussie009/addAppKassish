const etaService = require("../services/eta.service");

/**
 * Controller method
 */
const estimate = (req, res) => {
    const data = req.body.data;

    etaService.getEta(data).then((r) => {

        const estimation = r.data.windows;

        res.status(200).send(estimation);
    }).catch((error) => {
        res.status(error.response.status).send(error.response.data);
    });
};

module.exports = {
  estimate,
};
