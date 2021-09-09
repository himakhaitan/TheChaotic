const express = require("express");
const http = require("http");
const app = express();

app.use(express.json());

// GENERAL ROUTE
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

app.listen(PORT, () => {
  console.log(`Server is up and Running at PORT : ${PORT}`);
});

module.exports = SERVER;
