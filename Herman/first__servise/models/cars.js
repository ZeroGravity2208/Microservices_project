const mongoose = require('mongoose')
const Schema = mongoose.Schema


const carSchema = new Schema({
    id_marki: {
        type: String,
        required: true
    },
    id_modelu: {
        type: String,
        required: true
    },
    kolor: {
        type: String,
        required: true
    },
    nr_rejestracyjny: {
        type: String,
        required: true
    },
    wlasciciel: {
        type: String,
        required: true
    },
    czy_wypadek: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('cars', carSchema);