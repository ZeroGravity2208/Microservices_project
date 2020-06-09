// const mySchema = require("./models/driversdl");
const service = require("./service");

const validate = (body) => {
  let result = { error: false };
  const { categoryId: cId, driverId: dId, expireDate: date } = body;

  if (cId === undefined || dId === undefined || date === undefined) {
    result.error = true;
    result.noData = "Nie podales wszystkich danych";
    return result;
  }
  const dateParts = date.split("-");
  if (cId.length !== 16 || dId.length !== 16) {
    result.error = true;
    result.badId =
      "Id kategorii i id kierowcy musi być liczba szesnastkowa o dlugosci rownej 16";
  }

  //
  if (
    dateParts.length !== 3 ||
    dateParts[0].length !== 2 ||
    dateParts[1].length !== 2 ||
    dateParts[2].length !== 4
  ) {
    result.errDate_1 = "Prawidłowy schemat daty: dd-mm-yyyy, np: 02-07-2027";
    result.error = true;
  }

  if (!Number(dateParts[0]) || !Number(dateParts[1]) || !Number(dateParts[2])) {
    result.errDate_2 = "Dni, miesiące i lata są liczbami całkowitymi";
    result.error = true;
  }

  if (Number(dateParts[0]) < 1) {
    result.errDate_3 = "Dzień musi być liczbą większą od zera!";
    result.error = true;
  }

  if (Number(dateParts[1]) < 1 || Number(dateParts[1]) > 12) {
    result.errDate_4 = "Podaj miesiąc w postaci liczby z zakresu od 1 do 12!";
    result.error = true;
  }

  if (Number(dateParts[2]) < 1900 || Number(dateParts[2]) > 2100) {
    result.errDate_5 = "Podaj rok z zakresu 1900-2100";
    result.error = true;
  }

  if (
    Number(dateParts[0]) > 28 &&
    Number(dateParts[1]) === 2 &&
    !(Number(dateParts[2]) % 4 === 0)
  ) {
    result.errDate_6 = "Luty w tym roku może mieć maksymalnie 28 dni";
    result.error = true;
  }

  if (Number(dateParts[0]) > 29 && Number(dateParts[1]) === 2) {
    result.errDate_6 = "Luty nie może mieć więcej niż 28/29 dni";
    result.error = true;
  }

  if (
    Number(dateParts[0]) > 30 &&
    [4, 6, 9, 11].includes(Number(dateParts[1]))
  ) {
    result.errDate_6 = "W tym miesiącu nie ma więcej niż 30 dni";
    result.error = true;
  }

  if (
    Number(dateParts[0]) > 31 &&
    [1, 3, 5, 7, 8, 10, 12].includes(Number(dateParts[1]))
  ) {
    result.errDate_6 = "W tym miesiącu nie ma więcej niż 31 dni";
    result.error = true;
  }
  //
  return result;
};

const post = (callback, body) => {
  const validateResult = validate(body);
  console.log(validateResult);
  if (validateResult.error === false)
    service.post((data, status) => callback(data, status), body);
  else callback(validateResult, 400);
};

module.exports.post = post;
