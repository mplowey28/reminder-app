import { Response, Request } from "express";
import { ITodo, ITodoList } from "./../../types/todo";
import mongoose from "mongoose";
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
		const allTodoLists: ITodoList[] = await TodoList.find();
		res.status(200).json({
			message: "TodoList deleted",
			todo: deletedTodoList,
			todos: allTodoLists,
		});
	} catch (error) {
		throw error;
	}
};

const addTodo = async (req: Request, res: Response): Promise<void> => {
	try {
		const listId = req.params.id;
		const body = req.body as Pick<
			ITodo,
			"name" | "description" | "cost" | "status"
		>;
		const todo: ITodo = new Todo({
			name: body.name,
			description: body.description,
			cost: body.cost,
			status: body.status,
		});
		await TodoList.updateOne({ _id: listId }, { $push: { todos: todo } });

		res.status(201).json({ message: "Todo added" });
	} catch (error) {
		throw error;
	}
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
	try {
		const listId = mongoose.Types.ObjectId(req.params.listId);
		const todoId = mongoose.Types.ObjectId(req.params.id);
		await TodoList.findOneAndUpdate(
			{ _id: listId, "todos._id": todoId },
			{ $set: { "todos.$.status": true } }
		);
		res.status(200).json({
			message: "Todo updated",
		});
	} catch (error) {
		throw error;
	}
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
	try {
		const listId = mongoose.Types.ObjectId(req.params.listId);
		const todoId = mongoose.Types.ObjectId(req.params.id);
		await TodoList.updateOne(
			{ _id: listId },
			{
				$pull: { todos: { _id: todoId } },
			}
		);

		res.status(200).json({
			message: "Todo deleted",
		});
	} catch (error) {
		throw error;
	}
};

export {
	getTodoLists,
	addTodoList,
	deleteTodoList,
	addTodo,
	updateTodo,
	deleteTodo,
};
