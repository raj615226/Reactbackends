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
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    name: {
        type: String
    }
});
userSchema.methods.generateAuthToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        var jwtstring = process.env.JWT_SECRET;
        const token = jsonwebtoken_1.default.sign({ _id: this.email }, jwtstring, { expiresIn: '7 days' });
        user.token = token;
        yield user.save();
        return token;
    });
};
userSchema.statics.findByCredentials = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({ email });
    if (!user) {
        throw new Error('unable to login');
    }
    return user;
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
