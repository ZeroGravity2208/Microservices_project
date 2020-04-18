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
  const myError = {};
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
  const myError = {};
  let isReturn = false;
  let isId = false;
  DAL.getPolicemen(data => {
    data.forEach(element => {
      // console.log(Number(element.nr_legitymacji), Number(body.nr_legitymacji))
      // console.log(!(element._id == body.id))
      if (element.nr_legitymacji == body.nr_legitymacji && !(element._id == body.id)) {
        myError.errLegNo = 'Jest już policjant z takim nr legitymacji!'
        isReturn = true;
      }
      if (element.nr_identyfikacyjny == body.nr_identyfikacyjny && !(element._id == body.id)) {
        myError.errIdNo = 'Jest już policjant z takim nr identyfikacyjnym'
        isReturn = true;
      }

      if (element._id == body.id) {
        isId = true;
      }
      if (!isId) myError.errNoId = 'Nie ma policjanta o takim ID!';
    });
    if (isReturn || !isId) {
      // console.log('jestem w return')
      callback(myError, 400);
      return;
    }
    DAL.patchPoliceman((data, status) => callback(data, status), body);
  })
}

const deletePoliceman = (callback, id) => {
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
    DAL.deletePoliceman(data => callback(data, 200), id);
  })
}

module.exports.getPoliceman = getPoliceman;
module.exports.postPoliceman = postPoliceman;
module.exports.patchPoliceman = patchPoliceman;
module.exports.deletePoliceman = deletePoliceman;