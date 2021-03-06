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
exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.deleteTodoList = exports.addTodoList = exports.getTodoLists = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
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
        const allTodoLists = yield todoList_1.default.find();
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
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listId = req.params.id;
        const body = req.body;
        const todo = new todo_1.default({
            name: body.name,
            description: body.description,
            cost: body.cost,
            status: body.status,
        });
        yield todoList_1.default.updateOne({ _id: listId }, { $push: { todos: todo } });
        res.status(201).json({ message: "Todo added" });
    }
    catch (error) {
        throw error;
    }
});
exports.addTodo = addTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listId = mongoose_1.default.Types.ObjectId(req.params.listId);
        const todoId = mongoose_1.default.Types.ObjectId(req.params.id);
        yield todoList_1.default.findOneAndUpdate({ _id: listId, "todos._id": todoId }, { $set: { "todos.$.status": true } });
        res.status(200).json({
            message: "Todo updated",
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listId = mongoose_1.default.Types.ObjectId(req.params.listId);
        const todoId = mongoose_1.default.Types.ObjectId(req.params.id);
        yield todoList_1.default.updateOne({ _id: listId }, {
            $pull: { todos: { _id: todoId } },
        });
        res.status(200).json({
            message: "Todo deleted",
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteTodo = deleteTodo;
