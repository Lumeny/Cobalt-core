"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var API = (function () {
    function API() {
        this.app = express_1.default();
        this.app.get("/", function (req, res) {
            res.send("Hello world !");
        });
    }
    API.prototype.listen = function (port) {
        this.app.listen(port, function () {
            console.log('API server running on port ' + port.toString());
        });
    };
    return API;
}());
exports.API = API;
