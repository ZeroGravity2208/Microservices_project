const service = require("./service");
const DAL = require("./DAL");

const validateData = (body, callback) => {
  let isReturn = 0;
  let myError = {};
  console.log("valid", body);
  if (!body || body === undefined) {
    callback([
      {
        errNoData: "You passed no data!",
      },
      1,
    ]);
    return;
  }
  const { desc, minPenaltyPoints, maxPenaltyPoints, minFine, maxFine } = body;
  console.log(body);
  if (
    desc === "" ||
    minPenaltyPoints === "" ||
    maxPenaltyPoints === "" ||
    minFine === "" ||
    maxFine === "" ||
    desc === undefined ||
    minPenaltyPoints === undefined ||
    maxPenaltyPoints === undefined ||
    minFine === undefined ||
    maxFine === undefined
  ) {
    callback([
      {
        errNoData: "You didnt pass all needed data!",
      },
      1,
    ]);
    return;
  }

  if (desc.length < 10) {
    myError.errDesc = "Description must be longer than 10 chars!";
    isReturn = 1;
  }

  if (
    (!Number(minPenaltyPoints) && Number(minPenaltyPoints) !== 0) ||
    (!Number(maxPenaltyPoints) && Number(maxPenaltyPoints) !== 0) ||
    (!Number(minFine) && Number(minFine) !== 0) ||
    (!Number(maxFine) && Number(maxFine) !== 0)
  ) {
    myError.errNumber = "Penalty points and fine must be a number!";
    isReturn = 1;
  }

  if (
    Number(minPenaltyPoints) < 0 ||
    Number(maxPenaltyPoints) < 0 ||
    Number(minFine) < 0 ||
    Number(maxFine) < 0
  ) {
    myError.errNumber2 = "Penalty points and fine must be higher than 0!";
    isReturn = 1;
  }

  if (Number(minPenaltyPoints) > Number(maxPenaltyPoints)) {
    myError.errPoints = `Max points: ${maxPenaltyPoints} is not bigger or equal number than min points: ${minPenaltyPoints}`;
    isReturn = 1;
  }

  if (Number(minFine) > Number(maxFine)) {
    myError.errFine = `Max fine: ${maxFine} is not bigger or equal number than min fine: ${minFine}`;
    isReturn = 1;
  }

  callback([myError, isReturn]);
};

const getScale = (callback, id) => {
  if (typeof id !== "string" || id.length !== 24) {
    callback(
      {
        error: "Id is 24 chars long - hexadecimal",
      },
      400
    );
    return;
  }
  service.getScale((data, status) => callback(data, status), id);
};

const postScale = (callback, body) => {
  validateData(body, (data) => {
    if (data[1]) {
      callback(data[0], 400);
      return;
    }
    service.postScale((data, status) => callback(data, status), body);
  });
};

const putScale = (callback, body) => {
  // console.log(body)
  if (typeof body.id !== "string" || body.id.length !== 24) {
    callback(
      {
        error: "Wrong id",
      },
      400
    );
    return;
  }

  DAL.getScales((data) => {
    const scaleByTheId = data.find((scale) => {
      return scale.id == body.id;
    });
    console.log("dal: ", body.id);

    if (scaleByTheId === undefined) {
      callback(
        {
          errNoScale: "There's no scale with such id!",
        },
        404
      );
      return;
    } else {
      if (body.desc === undefined || body.desc == "") {
        body.desc = scaleByTheId.desc;
      }

      if (body.minPenaltyPoints === undefined || body.minPenaltyPoints == "") {
        body.minPenaltyPoints = scaleByTheId.minPenaltyPoints;
      }

      if (body.maxPenaltyPoints === undefined || body.maxPenaltyPoints == "") {
        body.maxPenaltyPoints = scaleByTheId.maxPenaltyPoints;
      }

      if (body.minFine === undefined || body.minFine == "") {
        body.minFine = scaleByTheId.minFine;
      }

      if (body.maxFine === undefined || body.maxFine == "") {
        body.maxFine = scaleByTheId.maxFine;
      }
    }
    console.log(body);
    validateData(body, (data) => {
      if (data[1]) {
        callback(data[0], 400);
        return;
      }
      service.putScale((data, status) => callback(data, status), body);
    });
  });
};

const deleteScale = (callback, id) => {
  if (typeof id !== "string" || id.length !== 24) {
    callback(
      {
        error: "Wrong id!",
      },
      400
    );
    return;
  }
  service.deleteScale((data, status) => callback(data, status), id);
};

module.exports.getScale = getScale;
module.exports.postScale = postScale;
module.exports.putScale = putScale;
module.exports.deleteScale = deleteScale;
