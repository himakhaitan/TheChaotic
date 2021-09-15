const express = require("express");
const compression = require("compression");
const cors = require("cors");
const helmet = require("./middlewares/helemt");
const logging = require("./middlewares/logging");
const http = require("http");
const app = express();

const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
app.use(compression());
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet);
app.use(logging);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);

// Passport Setup
require("./config/passport");

const authRoute = require("./routes/authroutes");
const connectRoute = require("./routes/connectRouter");
const blogRoute = require("./routes/blogRoutes");

app.use("/auth/google", authRoute);
app.use("/connect", connectRoute);
app.use("/blog", blogRoute);

// GENERAL ROUTE

/*
Method  : GET
Route   : /
Access  : Public
*/
app.get("/", (req, res) => {
  return res.send({
    server: "The Chaotic",
    status: "online",
    host: req.headers.host,
  });
});

const PORT = process.env.PORT || 8000;
const SERVER = http.createServer(app);

// DATABASE CONNECTION
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log("Datebase Connection Established!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is up and Running at PORT : ${PORT}`);
});

module.exports = SERVER;
