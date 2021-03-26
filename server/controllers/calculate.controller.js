const etaService = require("../services/adder");

/**
 * Controller method
 */
const calculate = (req, res) => {
    let num1 = req.body.num1;
    let num2 = req.body.num2;
    let sum = etaService.adder(num1, num2);
    let sumStr = sum.toString();
        res.status(200).send(sumStr);
   
};

module.exports = {
    calculate,
};