const Scale = require("./models/scale");

// const getScale = (callback) => {
//   const scaleData = new Scale({
//     desc: "Test",
//     minPenaltyPoints: 1,
//     maxPenaltyPoints: 4,
//     minFine: 100,
//     maxFine: 200,
//   });

//   scaleData.save((err) => {
//     if (err) {
//       callback(
//         {
//           status: "Internal Server Error",
//         },
//         500
//       );
//       return;
//     }
//     callback(
//       {
//         status: "Created",
//       },
//       201
//     );
//   });
// };

const getScales = (callback) => {
  Scale.find({}).exec((err, data) => {
    if (err) {
      callback("error");
      return;
    }
    callback(data, 200);
  });
};

const getScale = (callback, id) => {
  Scale.find({
    _id: id,
  }).exec((err, data) => {
    callback(data);
  });
};

const postScale = (callback, body) => {
  const scaleData = new Scale(body);
  scaleData.save((err) => {
    if (err) {
      callback(
        {
          status: "Internal Server Error",
        },
        500
      );
      return;
    }
    callback(
      {
        status: "Scale created",
      },
      201
    );
  });
};

const putScale = (callback, body) => {
  const {
    id,
    desc,
    minPenaltyPoints,
    maxPenaltyPoints,
    minFine,
    maxFine,
  } = body;
  Scale.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        desc,
        minPenaltyPoints,
        maxPenaltyPoints,
        minFine,
        maxFine,
      },
    },
    {
      new: true,
    },
    (err, doc) => {
      if (err) {
        callback("error", 500);
      }
      callback("updated", 201);
    }
  );
};

const deleteScale = (callback, id) => {
  Scale.findByIdAndDelete(id, (err) => {
    if (err) {
      callback(err);
      return;
    }
    callback("Scale deleted");
  });
};

module.exports.getScales = getScales;
module.exports.getScale = getScale;
module.exports.postScale = postScale;
module.exports.putScale = putScale;
module.exports.deleteScale = deleteScale;
