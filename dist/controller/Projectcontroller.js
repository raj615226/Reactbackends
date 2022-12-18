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
exports.viewappliedProjectController = exports.appliedProjectController = exports.getProjectController = exports.createProjectController = void 0;
const Project_1 = __importDefault(require("../model/Project"));
const createProjectController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = {
        status: 'error',
        msg: 'Something went wrong.',
    };
    try {
        const project = new Project_1.default({
            project: req.body.project,
            language: req.body.language,
            time: req.body.time,
            value: req.body.value,
            userid: req.body.userid,
        });
        yield project.save();
        response = {
            status: 'success',
            msg: 'Data created.',
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
exports.createProjectController = createProjectController;
const getProjectController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = {
        status: 'error',
        msg: 'Something went wrong.',
    };
    try {
        const project = yield Project_1.default.find({});
        if (project.length > 0) {
            response = {
                status: 'success',
                msg: 'Data found.',
                data: project
            };
        }
        else {
            response = {
                status: 'success',
                msg: ' No Data found.',
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
exports.getProjectController = getProjectController;
const appliedProjectController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = {
        status: 'error',
        msg: 'Something went wrong.',
    };
    try {
        const project = yield Project_1.default.findOneAndUpdate({ _id: req.body._id }, { $set: {
                appliedid: req.body.appliedid
            }
        });
        response = {
            status: 'success',
            msg: 'Applied Successfully.',
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
exports.appliedProjectController = appliedProjectController;
const viewappliedProjectController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = {
        status: 'error',
        msg: 'Something went wrong.',
    };
    try {
        console.log(req.body);
        const project = yield Project_1.default.find({ 'userid': req.body._id });
        console.log(project);
        if (project.length > 0) {
            response = {
                status: 'success',
                msg: 'Data created.',
                data: project
            };
        }
        else {
            response = {
                status: 'success',
                msg: ' No Data created.',
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
exports.viewappliedProjectController = viewappliedProjectController;
