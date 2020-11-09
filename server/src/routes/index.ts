import { Router } from "express";
import {
	getTodoLists,
	addTodoList,
	getTodos,
	addTodo,
	updateTodo,
	deleteTodo,
} from "../controllers/todos";

const router: Router = Router();

router.get("/todoLists", getTodoLists);

router.post("/add-todolist", addTodoList)

router.get("/todos", getTodos);

router.post("/add-todo", addTodo);

router.put("/edit-todo/:id", updateTodo);

router.delete("/delete-todo/:id", deleteTodo);

export default router;
