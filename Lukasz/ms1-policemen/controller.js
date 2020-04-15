const service = require('./service');

const getPoliceman = (callback, id) => {
  if (typeof (id) !== 'string' || id.length !== 24) {
    callback({
      error: 'Podałeś niepoprawny identyfikator'
    })
    return;
  }
  service.getPoliceman(data => callback(data), id)
}

const postPoliceman = (callback, body) => {
  const {
    imie,
    nazwisko,
    nr_identyfikacyjny,
    nr_legitymacji,
    stopien
  } = body;
  let isReturn = 0;
  let myError = {};
  // if (!imie || !nazwisko || !nr_identyfikacyjny || !nr_legitymacji || !stopien) {
  //   callback('Nie podałeś wszystkich danych!');
  //   return;
  // };

  // if (imie.length < 3) {
  //   myError.errName = 'Imie musi mieć co najmniej 3 znaki!'
  //   isReturn = 1;
  // }

  // if (nazwisko.length < 2) {
  //   myError.errSurname = 'Nazwisko musi mieć co najmniej 2 znaki!'
  //   isReturn = 1;
  // }

  if (!Number(nr_identyfikacyjny)) {
    myError.errIdNo_1 = 'Nr identyfikacyjny jest ciągiem cyfr!';
    isReturn = 1;
  }

  if (nr_identyfikacyjny.length !== 6) {
    myError.errIdNo_2 = 'Nr identyfikacyjny jest sześciocyfrowy!';
    isReturn = 1;
  }

  if (isReturn) {
    callback(myError)
    return
  }
  callback('okej');
}

module.exports.getPoliceman = getPoliceman;
module.exports.postPoliceman = postPoliceman;