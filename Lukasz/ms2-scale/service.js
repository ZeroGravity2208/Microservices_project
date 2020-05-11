const DAL = require("./DAL");

const getScale = (callback, id) => {
  let idExists = false;
  DAL.getScales((data) => {
    data.forEach((element) => {
      if (element._id == id) {
        idExists = true;
      }
    });
    if (!idExists) {
      callback(
        {
          error: "Theres no scale with such id!",
        },
        404
      );
      return;
    }
    DAL.getScale((data) => callback(data, 200), id);
  });
};

const postScale = (callback, body) => {
  const myError = {};
  let isScale = false;
  DAL.getScales((data) => {
    data.forEach((element) => {
      if (element.desc == body.desc) {
        myError.errExists = "There's already such scale!";
        isScale = true;
      }
    });
    if (isScale) {
      callback(myError, 400);
      return;
    }
    DAL.postScale((data, status) => callback(data, status), body);
  });
};

const putScale = (callback, body) => {
  const myError = {};
  let isReturn = false;
  let idExists = false;
  DAL.getScales((data) => {
    data.forEach((element) => {
      if (element._id == body.id) {
        idExists = true;
      }
      if (!idExists) myError.errNoId = "There's no scale with such id!";
    });
    if (isReturn || !idExists) {
      // console.log('jestem w return')
      callback(myError, 400);
      return;
    }
    DAL.putScale((data, status) => callback(data, status), body);
  });
};

const deleteScale = (callback, id) => {
  let isId = false;
  DAL.getScales((data) => {
    data.forEach((element) => {
      if (element._id == id) {
        isId = true;
      }
    });
    if (!isId) {
      callback(
        {
          error: "No scale with such id!",
        },
        404
      );
      return;
    }
    DAL.deleteScale((data) => callback(data, 200), id);
  });
};

module.exports.getScale = getScale;
module.exports.postScale = postScale;
module.exports.putScale = putScale;
module.exports.deleteScale = deleteScale;
