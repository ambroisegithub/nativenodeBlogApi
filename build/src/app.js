"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _blogRoutes = _interopRequireDefault(require("../src/routes/blogRoutes"));
var _multer = _interopRequireDefault(require("./helpers/multer"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _morgan = _interopRequireDefault(require("morgan"));
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
// import upload from "./helpers/multer"

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _morgan["default"])("dev"));
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_multer["default"].single("image"));
app.use("/api/v1", _blogRoutes["default"]);
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_multer["default"].single("image"));
// app.use("/", (req, res) => {
//   res.status(200).json({
//     code: 500,
//     message: "welcome to my Api",
//   });
// });

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
      url: "https://blogapi12.onrender.com"
    }]
  },
  apis: ["./src/routes/*.js", "./src/modules/*.js"]
};
var specs = (0, _swaggerJsdoc["default"])(options);
app.use((0, _cors["default"])());
app.use("/api-docs", _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(specs));
app.use("*", function (req, res) {
  return res.status(404).json({
    status: "failed",
    message: "Invalid URL"
  });
});
var _default = exports["default"] = app;
//# sourceMappingURL=app.js.map