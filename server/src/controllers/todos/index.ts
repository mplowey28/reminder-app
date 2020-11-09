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
}

const addTodoList = async (req: Request, res: Response): Promise<void> => {
	try {
		const body = req.body as Pick<ITodoList, "name" | "status">;
		const todoList: ITodoList = new TodoList({
			name: body.name,
			status: body.status,
		});

		const newTodoList: ITodoList = await todoList.save();
		const allTodoLists: ITodoList[] = await TodoList.find();

		res
			.status(201)
			.json({ message: "TodoList added", todoList: newTodoList, todoLists: allTodoLists });
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

const addTodo = async (req: Request, res: Response): Promise<void> => {
	try {
		const body = req.body as Pick<ITodo, "name" | "description" | "status">;

		const todo: ITodo = new Todo({
			name: body.name,
			description: body.description,
			status: body.status,
		});

		const newTodo: ITodo = await todo.save();
		const allTodos: ITodo[] = await Todo.find();

		res
			.status(201)
			.json({ message: "Todo added", todo: newTodo, todos: allTodos });
	} catch (error) {
		throw error;
	}
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
	try {
		const {
			params: { id },
			body,
		} = req;
		const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
			{ _id: id },
			body
		);
		const allTodos: ITodo[] = await Todo.find();
		res.status(200).json({
			message: "Todo updated",
			todo: updateTodo,
			todos: allTodos,
		});
	} catch (error) {
		throw error;
	}
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
	try {
		const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
			req.params.id
		);
		const allTodos: ITodo[] = await Todo.find();
		res.status(200).json({
			message: "Todo deleted",
			todo: deletedTodo,
			todos: allTodos,
		});
	} catch (error) {
		throw error;
	}
};

export { getTodoLists, addTodoList, getTodos, addTodo, updateTodo, deleteTodo };
