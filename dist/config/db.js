"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var dbport = process.env.MONGODB_URL;
mongoose_1.default.connect(dbport, void {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("db connected"))
    .catch((err) => console.log(err));
