const DAL = require('./DAL');
const myError = {};

// DAL.getPolicemen(data => console.log(data))

const getPoliceman = (callback, id) => {
  let isId = false;
  DAL.getPolicemen(data => {
    data.forEach(element => {
      if (element._id == id) {
        isId = true;
      }
    });
    if (!isId) {
      callback({
        error: 'Nie ma policjanta o takim id!'
      }, 404)
      return
    }
    DAL.getPoliceman(data => callback(data, 200), id);
  })
}

const postPoliceman = (callback, body) => {
  let isId = false;
  DAL.getPolicemen(data => {
    data.forEach(element => {
      if (element.nr_legitymacji == body.nr_legitymacji) {
        myError.errLegNo = 'Jest już policjant z takim nr legitymacji!'
        isId = true;
      }
      if (element.nr_identyfikacyjny == body.nr_identyfikacyjny) {
        myError.errIdNo = 'Jest już policjant z takim nr id'
        isId = true;
      }
    });
    if (isId) {
      callback(myError, 400)
      return
    }
    DAL.postPoliceman((data, status) => callback(data, status), body);
  })
}

const patchPoliceman = (callback, body) => {
  let isId = false;
  DAL.getPolicemen(data => {
    data.forEach(element => {
      if (element._id == body.nr_legitymacji) {
        myError.errNoId = 'Nie ma policjanta o takim id!'
        callback(myError, 400);
        return;
      }
    });
    DAL.patchPoliceman((data, status) => callback(data, status), body, id);
  })
}

module.exports.getPoliceman = getPoliceman;
module.exports.postPoliceman = postPoliceman;
module.exports.patchPoliceman = patchPoliceman;