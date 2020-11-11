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
exports.getTodos = exports.deleteTodoList = exports.addTodoList = exports.getTodoList = exports.getTodoLists = void 0;
const todo_1 = __importDefault(require("../../models/todo"));
const todoList_1 = __importDefault(require("../../models/todoList"));
const getTodoLists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todoLists = yield todoList_1.default.find();
        res.status(200).json({ todoLists });
    }
    catch (error) {
        throw error;
    }
});
exports.getTodoLists = getTodoLists;
const getTodoList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const todoList = yield todoList_1.default.findById(`${id}`);
        res.status(200).json({ todoList });
    }
    catch (error) {
        throw error;
    }
});
exports.getTodoList = getTodoList;
const addTodoList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const todoList = new todoList_1.default({
            name: body.name,
            status: body.status,
        });
        const newTodoList = yield todoList.save();
        const allTodoLists = yield todoList_1.default.find();
        res.status(201).json({
            message: "TodoList added",
            todoList: newTodoList,
            todoLists: allTodoLists,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.addTodoList = addTodoList;
const deleteTodoList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTodoList = yield todoList_1.default.findByIdAndRemove(req.params.id);
        const allTodoLists = yield todo_1.default.find();
        res.status(200).json({
            message: "TodoList deleted",
            todo: deletedTodoList,
            todos: allTodoLists,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteTodoList = deleteTodoList;
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_1.default.find();
        res.status(200).json({ todos });
    }
    catch (error) {
        throw error;
    }
});
exports.getTodos = getTodos;
