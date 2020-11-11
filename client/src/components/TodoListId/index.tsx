import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { getTodoList } from "../../API";
import AddTodo from "../AddTodo";
import TodoItem from "../TodoItem";
let socket: SocketIOClient.Socket;

const TodoListId: React.FC<ILocation> = ({ location }) => {
	const [id, setId] = useState<string | null | string[]>();
	const [todos, setTodos] = useState<ITodo[]>([]);
	const [newTodo, setNewTodo] = useState({});
	const ENDPOINT = "localhost:4000";

	useEffect(() => {
		const { id } = queryString.parse(location.search);
		setId(id);
		fetchTodoList(id);
		socket = io(ENDPOINT);
		socket.emit("addTodo", newTodo);
		return () => {
			socket.emit("disconnect");
		};
	}, [ENDPOINT, location.search, newTodo]);

	const fetchTodoList = (id: string | null | string[]) => {
		getTodoList(id)
			.then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
			.catch((err: Error) => console.log(err));
	};

	const handleSaveTodo = (e: React.FormEvent, formData: ITodo) => {
		e.preventDefault();
		setNewTodo({ id, name: formData.name, description: formData.description });
	};

	return (
		<main className='App'>
			<AddTodo saveTodo={handleSaveTodo} />
			{todos &&
				todos.map((todo: ITodo) => <TodoItem key={todo._id} todo={todo} />)}
		</main>
	);
};

export default TodoListId;
