const Policemen = require('./models/policemen');

const getPolicemen = callback => {
  Policemen.find({}).exec((err, data) => {
    if (err) {
      callback('_błąd')
      return
    }
    callback(data);
  })
}

const getPoliceman = (callback, id) => {
  Policemen.find({
    _id: id
  }).exec((err, data) => {
    callback(data);
  })
}

const deletePoliceman = (callback, id) => {
  Policemen.findByIdAndDelete(id, err => {
    if (err) {
      callback(err);
      return;
    }
    callback('_deleted');
  })
}

const postPoliceman = (callback, body) => {
  const policemenData = new Policemen(body);
  const dateParts = body.data_waznosci_legitymacji.split("-");
  const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  body.data_waznosci_legitymacji = dateObject;
  policemenData.save(err => {
    if (err) {
      callback({
        'status': 'Internal Server Error'
      }, 500);
      return
    }
    callback({
      'status': 'Created'
    }, 201);
  })
}

const patchPoliceman = (callback, body) => {
  const {
    id,
    imie,
    nazwisko,
    nr_identyfikacyjny,
    nr_legitymacji,
    stopien,
    data_waznosci_legitymacji
  } = body;
  Policemen.findOneAndUpdate({
    _id: id
  }, {
    $set: {
      imie: imie,
      nazwisko: nazwisko,
      nr_identyfikacyjny: nr_identyfikacyjny,
      nr_legitymacji: nr_legitymacji,
      stopien: stopien,
      data_waznosci_legitymacji: data_waznosci_legitymacji,
    }
  }, {
    new: true
  }, (err, doc) => {
    if (err) {
      callback('error', 500)
    }
    callback('zrobione', 201)
  });
}


module.exports.getPolicemen = getPolicemen;
module.exports.getPoliceman = getPoliceman;
module.exports.deletePoliceman = deletePoliceman;
module.exports.postPoliceman = postPoliceman;
module.exports.patchPoliceman = patchPoliceman;