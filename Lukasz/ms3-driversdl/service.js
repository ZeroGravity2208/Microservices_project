const DAL = require("./DAL");

const post = (callback, body) => {
  const myError = {};
  let isId = false;
  DAL.get((data) => {
    data.forEach((element) => {
      if (
        element.categoryId == body.categoryId &&
        element.driverId == body.driverId
      ) {
        console.log("error");
        myError.errLegNo = "Jest już taki kierowca z taka kategoria!";
        isId = true;
      }
    });
    if (isId) {
      callback(myError, 400);
      return;
    }
    DAL.post((data, status) => callback(data, status), body);
  });
};

module.exports.post = post;
