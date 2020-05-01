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

const getScale = (callback) => {
  Scale.find({}).exec((err, data) => {
    if (err) {
      callback("error");
      return;
    }
    callback(data, 200);
  });
};

module.exports.getScale = getScale;
