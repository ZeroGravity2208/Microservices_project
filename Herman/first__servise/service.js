const DAL = require('./DAL')

const add_car = (callback, body) => {

    DAL.add_car((data, status) => callback(data, status), body);
};

module.exports.add_car = add_car;