const fs = require("fs");

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

module.exports = (req, res, next) => {
  let t = new Date();
  let formattedString = `${req.ip} -- [${t.toLocaleString()}] ${req.method} ${
    req.url
  } ${res.statusCode} ${req.headers["user-agent"]}`;

  if (process.env.NODE_ENV == "production") {
    const dateObj = new Date();
    fs.appendFile(
      `./logs/${months[dateObj.getUTCMonth()]}-${dateObj.getUTCFullYear()}.txt`,
      `${formattedString}\n`,
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
  } else {
    console.log(formattedString);
  }
  next();
};
