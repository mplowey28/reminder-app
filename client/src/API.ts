import axios, { AxiosResponse } from "axios";

const baseUrl: string = "http://localhost:4000";

export const getTodoLists = async (): Promise<AxiosResponse<ApiDataType>> => {
	try {
		const todoLists: AxiosResponse<ApiDataType> = await axios.get(
			baseUrl + "/todoLists"
		);
		return todoLists;
	} catch (error) {
		throw new Error(error);
	}
};

export const addTodoList = async (
	formData: ITodoList
): Promise<AxiosResponse<ApiDataType>> => {
	try {
		const todoList: Omit<ITodoList, "_id"> = {
			name: formData.name,
			status: false,
		};

		const saveTodoList: AxiosResponse<ApiDataType> = await axios.post(
			baseUrl + "/add-todolist",
			todoList
		);
		return saveTodoList;
	} catch (error) {
		throw new Error(error);
	}
};

export const updateTodoList = async (
	todoList: ITodoList
): Promise<AxiosResponse<ApiDataType>> => {
	try {
		const todoListUpdate: Pick<ITodoList, "status"> = {
			status: true,
		};
		const updatedTodoList: AxiosResponse<ApiDataType> = await axios.put(
			`${baseUrl}/edit-todo/${todoList._id}`,
			todoListUpdate
		);
		return updatedTodoList;
	} catch (error) {
		throw new Error(error);
	}
};

export const deleteTodoList = async (
	_id: string
): Promise<AxiosResponse<ApiDataType>> => {
	try {
		const deletedTodoList: AxiosResponse<ApiDataType> = await axios.delete(
			`${baseUrl}/delete-todoList/${_id}`
		);
		return deletedTodoList;
	} catch (error) {
		throw new Error(error);
	}
};

export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
	try {
		const todos: AxiosResponse<ApiDataType> = await axios.get(
			baseUrl + "/todos"
		);
		return todos;
	} catch (error) {
		throw new Error(error);
	}
};



export const addTodo = async (
	formData: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
	try {
		const todo: Omit<ITodo, "_id"> = {
			name: formData.name,
			description: formData.description,
			status: false,
		};

		const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
			baseUrl + "/add-todo",
			todo
		);
		return saveTodo;
	} catch (error) {
		throw new Error(error);
	}
};

export const updateTodo = async (
	todo: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
	try {
		const todoUpdate: Pick<ITodo, "status"> = {
			status: true,
		};
		const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
			`${baseUrl}/edit-todo/${todo._id}`,
			todoUpdate
		);
		return updatedTodo;
	} catch (error) {
		throw new Error(error);
	}
};

export const deleteTodo = async (
	_id: string
): Promise<AxiosResponse<ApiDataType>> => {
	try {
		const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
			`${baseUrl}/delete-todo/${_id}`
		);
		return deletedTodo;
	} catch (error) {
		throw new Error(error);
	}
};
