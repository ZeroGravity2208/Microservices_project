const Cars = require('./models/cars')

const zapusk_mashin = callback => {
    // Cars.find('').exec((error, data) => {
    //     if (error) {
    //         callback('404');
    //         return
    //     }
    //     callback(data, 200)
    // })
    const carData = new Cars({
        id_marki: '123',
        id_modelu: '123',
        kolor: '123',
        nr_rejestracyjny: '123',
        wlasciciel: '123',
        czy_wypadek: true
    });
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

module.exports.zapusk_mashin = zapusk_mashin;