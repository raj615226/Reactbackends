"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const UserRouter_1 = __importDefault(require("./router/UserRouter"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const ProjectRouter_1 = __importDefault(require("./router/ProjectRouter"));
var dbport = process.env.MONGODB_URL;
console.log(dbport);
mongoose_1.default.connect("mongodb+srv://raj615226:3aADDRcab04gvcuK@cluster0.6jnli3x.mongodb.net/?retryWrites=true&w=majority", void {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("db connected"))
    .catch((err) => console.log(err));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = process.env.PORT || 4000;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.use(UserRouter_1.default);
app.use(ProjectRouter_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
