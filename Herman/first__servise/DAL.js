const Car = require('./models/cars')

const add_car = (callback, body) => {
    // Cars.find('').exec((error, data) => {
    //     if (error) {
    //         callback('404');
    //         return
    //     }
    //     callback(data, 200)
    // })
    const carData = new Car(body);
    carData.save((err) => {
        if (err) {
            callback({
                    status: "Internal Server Error",
                },
                500
            );
            return;
        }
        callback({
                status: "car created",
            },
            201
        );
    });
};

module.exports.add_car = add_car;