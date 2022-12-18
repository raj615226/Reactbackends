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
exports.getprofileController = exports.logutController = exports.logincontroller = exports.createcontroller = void 0;
const User_1 = __importDefault(require("../model/User"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const createcontroller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let response = {
        status: 'error',
        msg: 'Something went wrong.'
    };
    try {
        const verifyuser = yield User_1.default.find({ 'email': req.body.email });
        console.log(verifyuser);
        if ((_a = verifyuser[0]) === null || _a === void 0 ? void 0 : _a.email) {
            res.status(400).send({
                "status": "failure",
                "msg": "enter user already register"
            });
        }
        else {
            var jwtstring = process.env.JWT_SECRET;
            const tokens = jsonwebtoken_1.default.sign({ _id: req.body.email }, jwtstring, { expiresIn: '7 days' });
            const hashpassword = yield bcryptjs_1.default.hash(req.body.password, 12);
            const user = new User_1.default({
                email: req.body.email,
                token: tokens,
                password: hashpassword,
                type: req.body.type,
                name: req.body.name
            });
            yield user.save();
            response = {
                status: "success",
                msg: "user created",
                data: user,
            };
        }
    }
    catch (err) {
        console.log(err);
        response = {
            status: 'error',
            msg: 'Ops! Something went wrong. Please try again later.'
        };
    }
    finally {
        res.send(response);
    }
});
exports.createcontroller = createcontroller;
const logincontroller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = {
        status: 'error',
        msg: 'Something went wrong.'
    };
    try {
        const user = yield User_1.default.findByCredentials(req.body.email);
        var hashpassword = user.password;
        var isMatch = yield bcryptjs_1.default.compare(req.body.password, hashpassword);
        if (isMatch) {
            const token = yield user.generateAuthToken();
            response = {
                "status": "success",
                "msg": "details found",
                data: user,
            };
        }
        else {
            response = {
                status: 'failed',
                msg: 'Enter a valid password.'
            };
        }
    }
    catch (err) {
        console.log(err);
        response = {
            status: 'error',
            msg: 'Ops! Something went wrong. Please try again later.'
        };
    }
    finally {
        res.send(response);
    }
});
exports.logincontroller = logincontroller;
const logutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    let response = {
        status: 'error',
        msg: 'Something went wrong.',
    };
    try {
        const token = (_b = req.header('Authorization')) === null || _b === void 0 ? void 0 : _b.replace('Bearer', '');
        const jwtstring = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, jwtstring);
        const queryData = yield User_1.default.findOneAndUpdate({ email: decoded._id }, { $set: {
                token: null
            }
        });
        response = {
            status: 'success',
            msg: 'Logout successfully'
        };
    }
    catch (err) {
        console.log(err);
        response = {
            status: 'error',
            msg: 'Ops! Something went wrong. Please try again later.'
        };
    }
    finally {
        res.send(response);
    }
});
exports.logutController = logutController;
const getprofileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = {
        status: 'error',
        msg: 'Something went wrong.',
    };
    try {
        const profile = yield User_1.default.findOne({ _id: req.body.appliedid }, { email: 1, type: 1 });
        response = {
            status: 'success',
            msg: 'Data found successfully',
            data: profile
        };
    }
    catch (err) {
        console.log(err);
        response = {
            status: 'error',
            msg: 'Ops! Something went wrong. Please try again later.'
        };
    }
    finally {
        res.send(response);
    }
});
exports.getprofileController = getprofileController;
