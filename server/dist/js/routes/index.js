"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = require("../controllers/todos");
const router = express_1.Router();
router.get("/todoLists", todos_1.getTodoLists);
router.get("/todoLists/:id", todos_1.getTodoList);
router.post("/add-todolist", todos_1.addTodoList);
router.delete("/delete-todolist/:id", todos_1.deleteTodoList);
router.get("/todos", todos_1.getTodos);
exports.default = router;
