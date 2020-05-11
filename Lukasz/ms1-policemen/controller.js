const service = require("./service");
const DAL = require("./DAL");

const policeRanks = [
  "posterunkowy",
  "starszy posterunkowy",
  "sierżant",
  "starszy sierżant",
  "sierżant sztabowy",
  "młodszy aspirant",
  "aspirant",
  "starszy aspirant",
  "aspirant sztabowy",
  "podkomisarz",
  "komisarz",
  "nadkomisarz",
  "podinspektor",
  "młodszy inspektor",
  "inspektor",
  "nadinspektor",
  "generalny inspektor",
];

const getPoliceman = (callback, id) => {
  if (typeof id !== "string" || id.length !== 24) {
    callback(
      {
        error: "Id jest liczbą szesnastkową o długości 24 znaków",
      },
      400
    );
    return;
  }
  service.getPoliceman((data, status) => callback(data, status), id);
};

const validateData = (body, callback) => {
  let isReturn = 0;
  let myError = {};
  console.log("valid", body);
  if (!body || body === undefined) {
    callback([
      {
        errNoData: "Nie podałeś żadnych danych!",
      },
      1,
    ]);
    return;
  }
  const {
    imie,
    nazwisko,
    nr_identyfikacyjny,
    nr_legitymacji,
    stopien,
    data_waznosci_legitymacji,
  } = body;

  if (
    !imie ||
    !nazwisko ||
    !nr_identyfikacyjny ||
    !nr_legitymacji ||
    !stopien ||
    !data_waznosci_legitymacji ||
    imie === undefined ||
    nazwisko === undefined ||
    nr_identyfikacyjny === undefined ||
    nr_legitymacji === undefined ||
    stopien === undefined ||
    data_waznosci_legitymacji === undefined
  ) {
    callback([
      {
        errNoData: "Nie podałeś wszystkich danych!",
      },
      1,
    ]);
    return;
  }

  const dateParts = data_waznosci_legitymacji.split("-");

  if (imie.length < 3) {
    myError.errName = "Imie musi mieć co najmniej 3 znaki!";
    isReturn = 1;
  }

  if (nazwisko.length < 2) {
    myError.errSurname = "Nazwisko musi mieć co najmniej 2 znaki!";
    isReturn = 1;
  }

  if (!Number(nr_identyfikacyjny)) {
    myError.errIdNo_1 = "Nr identyfikacyjny jest ciągiem cyfr!";
    isReturn = 1;
  }

  if (nr_identyfikacyjny.toString().length !== 6) {
    console.log(nr_identyfikacyjny.length);
    myError.errIdNo_2 = "Nr identyfikacyjny jest sześciocyfrowy!";
    isReturn = 1;
  }

  if (nr_legitymacji.length !== 9) {
    myError.errLegNo_1 = "Nr legitymacji składa się z 9 znaków!";
    isReturn = 1;
  }

  for (let i = 0; i < nr_legitymacji.length; i++) {
    const asciiCode = nr_legitymacji.charCodeAt(i);
    if (
      asciiCode < 48 ||
      asciiCode > 90 ||
      (asciiCode > 57 && asciiCode < 65)
    ) {
      myError.errLegNo_2 =
        "Nr legitymacji musi składać się z ciągu wielkich liter i cyfr!";
      isReturn = 1;
    }
  }

  for (let i = 0; i < imie.length; i++) {
    const asciiCode = imie.charCodeAt(i);
    if (
      asciiCode < 65 ||
      asciiCode > 122 ||
      (asciiCode > 90 && asciiCode < 97)
    ) {
      myError.errNameStr = "Imię musi składać się z ciągu liter!";
      isReturn = 1;
    }
  }

  for (let i = 0; i < nazwisko.length; i++) {
    const asciiCode = nazwisko.charCodeAt(i);
    if (
      asciiCode < 65 ||
      asciiCode > 122 ||
      (asciiCode > 90 && asciiCode < 97)
    ) {
      myError.errSurnameStr = "Nazwisko musi składać się z ciągu liter!";
      isReturn = 1;
    }
  }

  if (!policeRanks.includes(stopien)) {
    myError.errRank = "Nie ma takiego stopnia w policji!";
    isReturn = 1;
  }

  if (
    dateParts.length !== 3 ||
    dateParts[0].length !== 2 ||
    dateParts[1].length !== 2 ||
    dateParts[2].length !== 4
  ) {
    myError.errDate_1 = "Prawidłowy schemat daty: dd-mm-yyyy, np: 02-07-2027";
    isReturn = 1;
  }

  if (!Number(dateParts[0]) || !Number(dateParts[1]) || !Number(dateParts[2])) {
    myError.errDate_2 = "Dni, miesiące i lata są liczbami całkowitymi";
    isReturn = 1;
  }

  if (Number(dateParts[0]) < 1) {
    myError.errDate_3 = "Dzień musi być liczbą większą od zera!";
    isReturn = 1;
  }

  if (Number(dateParts[1]) < 1 || Number(dateParts[1]) > 12) {
    myError.errDate_4 = "Podaj miesiąc w postaci liczby z zakresu od 1 do 12!";
    isReturn = 1;
  }

  if (Number(dateParts[2]) < 1900 || Number(dateParts[2]) > 2100) {
    myError.errDate_5 = "Podaj rok z zakresu 1900-2100";
    isReturn = 1;
  }

  if (
    Number(dateParts[0]) > 28 &&
    Number(dateParts[1]) === 2 &&
    !(Number(dateParts[2]) % 4 === 0)
  ) {
    myError.errDate_6 = "Luty w tym roku może mieć maksymalnie 28 dni";
    isReturn = 1;
  }

  if (Number(dateParts[0]) > 29 && Number(dateParts[1]) === 2) {
    myError.errDate_6 = "Luty nie może mieć więcej niż 28/29 dni";
    isReturn = 1;
  }

  if (
    Number(dateParts[0]) > 30 &&
    [4, 6, 9, 11].includes(Number(dateParts[1]))
  ) {
    myError.errDate_6 = "W tym miesiącu nie ma więcej niż 30 dni";
    isReturn = 1;
  }

  if (
    Number(dateParts[0]) > 31 &&
    [1, 3, 5, 7, 8, 10, 12].includes(Number(dateParts[1]))
  ) {
    myError.errDate_6 = "W tym miesiącu nie ma więcej niż 31 dni";
    isReturn = 1;
  }

  callback([myError, isReturn]);
};

const postPoliceman = (callback, body) => {
  validateData(body, (data) => {
    if (data[1]) {
      callback(data[0], 400);
      return;
    }
    service.postPoliceman((data, status) => callback(data, status), body);
  });
};

const patchPoliceman = (callback, body) => {
  // console.log(body)
  if (typeof body.id !== "string" || body.id.length !== 24) {
    callback(
      {
        error: "Id jest liczbą szesnastkową o długości 24 znaków",
      },
      400
    );
    return;
  }

  DAL.getPolicemen((data) => {
    const policemanByTheId = data.find((policeman) => {
      return policeman.id == body.id;
    });
    console.log("dal", policemanByTheId);

    if (policemanByTheId === undefined) {
      callback(
        {
          errNoPolicemen: "Nie ma policjanta z takim id!",
        },
        404
      );
      return;
    } else {
      if (body.imie === undefined || body.imie == "") {
        body.imie = policemanByTheId.imie;
      }

      if (body.nazwisko === undefined || body.nazwisko == "") {
        body.nazwisko = policemanByTheId.nazwisko;
      }

      if (
        body.nr_identyfikacyjny === undefined ||
        body.nr_identyfikacyjny == ""
      ) {
        body.nr_identyfikacyjny = policemanByTheId.nr_identyfikacyjny;
      }

      if (body.nr_legitymacji === undefined || body.nr_legitymacji == "") {
        body.nr_legitymacji = policemanByTheId.nr_legitymacji;
      }

      if (body.stopien === undefined || body.stopien == "") {
        body.stopien = policemanByTheId.stopien;
      }

      if (
        body.data_waznosci_legitymacji === undefined ||
        body.data_waznosci_legitymacji == ""
      ) {
        body.data_waznosci_legitymacji =
          policemanByTheId.data_waznosci_legitymacji;
      }
    }

    validateData(body, (data) => {
      if (data[1]) {
        callback(data[0], 400);
        return;
      }
      service.patchPoliceman((data, status) => callback(data, status), body);
    });
  });
};

const deletePoliceman = (callback, id) => {
  if (typeof id !== "string" || id.length !== 24) {
    callback(
      {
        error: "Id jest liczbą szesnastkową o długości 24 znaków",
      },
      400
    );
    return;
  }
  service.deletePoliceman((data, status) => callback(data, status), id);
};

module.exports.getPoliceman = getPoliceman;
module.exports.postPoliceman = postPoliceman;
module.exports.patchPoliceman = patchPoliceman;
module.exports.deletePoliceman = deletePoliceman;
