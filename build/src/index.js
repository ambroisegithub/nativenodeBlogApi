"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _app = _interopRequireDefault(require("./app.js"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
// import bodyParser from "body-parser"
_dotenv["default"].config();
var options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My APIs documentation",
      version: "1.0.0",
      description: "This is my API documentation"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          "in": "header",
          bearerformat: "JWT"
        }
      }
    },
    securit: [{
      bearerAuth: []
    }],
    servers: [{
      url: "https://nativeblognodeapi.onrender.com"
    }]
  },
  apis: ["./src/routes/*.js", "./src/modules/*.js"]
};
var specs = (0, _swaggerJsdoc["default"])(options);
_app["default"].use("/api-docs", _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(specs));
_mongoose["default"].set("strictQuery", false);
_mongoose["default"].connect(process.env.DATABASE).then(function () {
  console.log("DB CONNECTED");
})["catch"](function (err) {
  console.log(err);
});
var PORT = process.env.PORT;
_app["default"].listen(PORT, function () {
  console.log("The server is running on port ".concat(PORT));
});
_app["default"].use("*", function (req, res) {
  res.status(404).json({
    status: "fail",
    data: "Not Found"
  });
});
var _default = exports["default"] = _app["default"];
//# sourceMappingURL=index.js.map