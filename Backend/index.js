require("dotenv").config();
const cluster = require("cluster");

if (cluster.isMaster) {
  let cpuCount = require("os").cpus().length;
  console.log("CPU Count: " + cpuCount);
  cluster.fork();
} else {
  require("./server");
}
