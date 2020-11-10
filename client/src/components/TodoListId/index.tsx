import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../../API";
import AddTodo from "../AddTodo";
import TodoItem from "../TodoItem";
let socket;

type Props = TodoProps & {
	updateTodo: (todo: ITodo) => void;
	deleteTodo: (_id: string) => void;
};

const TodoListId: React.FC<ILocation & Props> = ({ location }) => {
	const [id, setId] = useState<string | string[] | null>();
	const [todos, setTodos] = useState<ITodo[]>([]);
	const ENDPOINT = "localhost:4000";

	useEffect(() => {
		fetchTodoLists();
		const { id } = queryString.parse(location.search);
		socket = io(ENDPOINT);
		setId(id);
	}, [ENDPOINT, location.search]);

	const fetchTodoLists = () => {
		getTodos()
			.then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
			.catch((err: Error) => console.log(err));
	};

	const handleSaveTodo = (e: React.FormEvent, formData: ITodo) => {
		e.preventDefault();
		addTodo(formData)
			.then(({ status, data }) => {
				if (status !== 201) {
					throw new Error("Error! Todo not saved");
				}
				setTodos(data.todos);
			})
			.catch(err => console.log(err));
	};

	const handleUpdateTodo = (todo: ITodo) => {
		updateTodo(todo)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! Todo not updated");
				}
				setTodos(data.todos);
			})
			.catch(err => console.log(err));
	};

	const handleDeleteTodo = (_id: string) => {
		deleteTodo(_id)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! Todo not deleted");
				}
				setTodos(data.todos);
			})
			.catch(err => console.log(err));
	};

	return (
		<main className='App'>
			<AddTodo saveTodo={handleSaveTodo} />
			{todos.map((todo: ITodo) => (
				<TodoItem
					key={todo._id}
					todo={todo}
					updateTodo={handleUpdateTodo}
					deleteTodo={handleDeleteTodo}
				/>
			))}
		</main>
	);
};

export default TodoListId;
