import { Router, Response, Request } from "express";
import {
	getTodos,
	addTodo,
	updateTodo,
	deleteTodo,
} from "../controllers/todos";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
	res.send("server is up and running");
});

router.get("/todos", getTodos);

router.post("/add-todo", addTodo);

router.put("/edit-todo/:id", updateTodo);

router.delete("/delete-todo/:id", deleteTodo);

export default router;
