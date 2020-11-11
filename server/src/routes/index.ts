import { Router, Response, Request } from "express";
import {
	getTodoLists,
	getTodoList,
	addTodoList,
	deleteTodoList,
	getTodos,
} from "../controllers/todos";

const router: Router = Router();

router.get("/todoLists", getTodoLists);

router.get("/todoLists/:id", getTodoList);

router.post("/add-todolist", addTodoList);

router.delete("/delete-todolist/:id", deleteTodoList);

router.get("/todos", getTodos);

export default router;
