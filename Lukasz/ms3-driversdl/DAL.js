const mySchema = require("./models/driversdl");

const post = (callback, body) => {
  const data = new mySchema(body);
  data.save((err) => {
    if (err) {
      callback(
        {
          message: "Internal Server Error",
        },
        500
      );
      return;
    }
    callback(
      {
        message: "Added",
      },
      201
    );
  });
};

module.exports.post = post;
