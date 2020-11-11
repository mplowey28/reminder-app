import { Router } from "express";
import {
	getTodoLists,
	addTodoList,
	deleteTodoList,
	addTodo,
	updateTodo,
	deleteTodo,
} from "../controllers/todos";

const router: Router = Router();

router.get("/todoLists", getTodoLists);

router.post("/add-todolist", addTodoList);

router.delete("/delete-todolist/:id", deleteTodoList);

router.post("/add-todo/:id", addTodo);

router.put("/edit-todo/:id/:listId", updateTodo);

router.delete("/delete-todo/:id/:listId", deleteTodo);

export default router;
