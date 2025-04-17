const serverless = require("serverless-http");
const express = require("express");
const app = express();

require("../server/src")(app);

module.exports.handler = serverless(app);
