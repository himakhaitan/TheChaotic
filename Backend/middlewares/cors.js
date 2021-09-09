module.exports = (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
};