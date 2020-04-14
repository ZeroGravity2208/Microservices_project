const DAL = require('./DAL');

// DAL.getPolicemen(data => console.log(data))

const getPoliceman = (callback, id) => {
  let isId = false;
  DAL.getPolicemen(data => {
    data.forEach(element => {
      if (element._id == id) {
        isId = true;
      }
    });
    DAL.getPoliceman(data => callback(isId ? data : {
      error: 'Nie ma policjanta o takim id!',
    }), id);
  })
}

module.exports.getPoliceman = getPoliceman;