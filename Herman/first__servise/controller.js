const service = require('./service')

const add_car = (callback, body) => {
    console.log(body)
    service.add_car((data, status) => callback(data, status), body)

};
module.exports.add_car = add_car;