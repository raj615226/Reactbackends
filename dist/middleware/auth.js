"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../model/User"));
const userAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer', '');
        console.log(token);
        const jwt = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, jwt);
        const query = yield User_1.default.findOne({ 'email': decoded._id });
        console.log(query);
        if (Object.keys(query).length > 0) {
            req.body = query;
            next();
        }
        else {
            res.send({ error: "Not able to verify" });
        }
    }
    catch (err) {
        res.send({ error: "Unable to authenticate" });
    }
});
exports.userAuth = userAuth;
