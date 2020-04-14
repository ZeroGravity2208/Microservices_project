const Policemen = require('./models/policemen');

const getPolicemen = callback => {
  Policemen.find({}).exec((err, data) => {
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

  policemenData.save(err => {
    if (err) {
      callback('error', err)
      return
    }
    callback('_added');
  })
}

const patchPoliceman = (callback) => {
  const id = '5e95be7d993a1939701117d5'


  Policemen.findOneAndUpdate({
    _id: id
  }, {
    $set: {
      imie: "nowe_imie"
    }
  }, {
    new: true
  }, (err, doc) => {
    if (err) {
      callback('error')
    }
    callback('zrobione')
  });
}


module.exports.getPolicemen = getPolicemen;
module.exports.getPoliceman = getPoliceman;
module.exports.deletePoliceman = deletePoliceman;
module.exports.postPoliceman = postPoliceman;
module.exports.patchPoliceman = patchPoliceman;