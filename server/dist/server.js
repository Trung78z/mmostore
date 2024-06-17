"use strict";

var _http = _interopRequireDefault(require("http"));
var _dotenv = require("dotenv");
var _app = _interopRequireDefault(require("./app"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
(0, _dotenv.configDotenv)();
var PORT = process.env.PORT || 8080;
var server = _http["default"].createServer(_app["default"]);
server.listen(PORT, function () {
  console.log("Server is running on http://localhost:".concat(PORT));
});