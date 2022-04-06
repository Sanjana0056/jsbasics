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
exports.queryTodo = void 0;
const ReadWriteFile_1 = require("../ReadWriteFile");
const url_1 = __importDefault(require("url"));
const queryTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqUrl = req.url;
    try {
        const { query } = url_1.default.parse(reqUrl, true).query;
        const fileData = yield (0, ReadWriteFile_1.readFile)();
        if (query) {
            const todos = fileData.filter((e) => e.title == query);
            if (!todos.length) {
                res.statusCode = 200;
                res.end("No Match found");
            }
            res.writeHead(200, { 'Content-Type': 'application/json' }); // request succeeded
            res.end(JSON.stringify(todos));
        }
        else {
            res.writeHead(200, { 'Content-Type': 'application/json' }); // request succeeded
            res.end(JSON.stringify(fileData));
        }
    }
    catch (error) {
        res.statusCode = 400; //bad request
        res.end(error);
    }
});
exports.queryTodo = queryTodo;
