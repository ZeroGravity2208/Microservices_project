const mySchema = require("./models/driversdl");

const get = (callback) => {
  // console.log("wykonano get");
  mySchema.find({}).exec((err, data) => {
    if (err) {
      callback("_błąd");
      return;
    }
    callback(data);
  });
};

const post = (callback, body) => {
  const dateParts = body.expireDate.split("-");
  const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  body.expireDate = dateObject;
  const dataToDB = new mySchema(body);
  dataToDB.save((err) => {
    if (err) {
      callback(
        {
          status: err,
        },
        500
      );
      return;
    }
    callback(
      {
        status: "Created",
      },
      201
    );
  });
};

module.exports.post = post;
module.exports.get = get;
