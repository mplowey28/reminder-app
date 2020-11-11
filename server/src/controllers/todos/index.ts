import { Response, Request } from "express";
import { ITodo, ITodoList } from "./../../types/todo";
import Todo from "../../models/todo";
import TodoList from "../../models/todoList";

const getTodoLists = async (req: Request, res: Response): Promise<void> => {
	try {
		const todoLists: ITodoList[] = await TodoList.find();
		res.status(200).json({ todoLists });
	} catch (error) {
		throw error;
	}
};

const getTodoList = async (req: Request, res: Response): Promise<void> => {
	try {
		const id: string = req.params.id;
		const todoList: ITodoList[] | null | ITodoList = await TodoList.findById(
			`${id}`
		);
		res.status(200).json({ todoList });
	} catch (error) {
		throw error;
	}
};

const addTodoList = async (req: Request, res: Response): Promise<void> => {
	try {
		const body = req.body as Pick<ITodoList, "name" | "status">;
		const todoList: ITodoList = new TodoList({
			name: body.name,
			status: body.status,
		});

		const newTodoList: ITodoList = await todoList.save();
		const allTodoLists: ITodoList[] = await TodoList.find();

		res.status(201).json({
			message: "TodoList added",
			todoList: newTodoList,
			todoLists: allTodoLists,
		});
	} catch (error) {
		throw error;
	}
};

const deleteTodoList = async (req: Request, res: Response): Promise<void> => {
	try {
		const deletedTodoList: ITodoList | null = await TodoList.findByIdAndRemove(
			req.params.id
		);
		const allTodoLists: ITodoList[] = await Todo.find();
		res.status(200).json({
			message: "TodoList deleted",
			todo: deletedTodoList,
			todos: allTodoLists,
		});
	} catch (error) {
		throw error;
	}
};

const getTodos = async (req: Request, res: Response): Promise<void> => {
	try {
		const todos: ITodo[] = await Todo.find();
		res.status(200).json({ todos });
	} catch (error) {
		throw error;
	}
};

export { getTodoLists, getTodoList, addTodoList, deleteTodoList, getTodos };
