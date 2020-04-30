const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const policemenSchema = new Schema({
  imie: {
    type: String,
    required: [true, 'Imię jest wymagane'],
  },
  nazwisko: {
    type: String,
    required: [true, 'Nazwisko jest wymagane'],
  },
  nr_identyfikacyjny: {
    type: Number,
    required: [true, 'Nr identyfikacyjny jest wymagany'],
  },
  nr_legitymacji: {
    type: String,
    required: [true, 'Nr legitymacji jest wymagany'],
  },
  stopien: {
    type: String,
    required: [true, 'Stopień jest wymagany'],
  },
  data_waznosci_legitymacji: {
    type: String,
    default: Date.now,
  },
})

module.exports = mongoose.model('policemen', policemenSchema);