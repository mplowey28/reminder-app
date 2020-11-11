import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { getTodoList } from "../../API";
import AddTodo from "../AddTodo";
import TodoItem from "../TodoItem";
let socket;

type Props = TodoProps & {
	updateTodo: (todo: ITodo) => void;
	deleteTodo: (_id: string) => void;
};

const TodoListId: React.FC<ILocation & Props> = ({ location }) => {
	const [id, setId] = useState<string | null | string[]>();
	const [todos, setTodos] = useState<ITodo[]>([]);
	const ENDPOINT = "localhost:4000";

	useEffect(() => {
		const { id } = queryString.parse(location.search);
		setId(id);
		fetchTodoList(id);
		socket = io(ENDPOINT);
	}, [ENDPOINT, location.search]);

	const fetchTodoList = (id: string | null | string[]) => {
		getTodoList(id)
			.then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
			.catch((err: Error) => console.log(err));
	};

	const handleSaveTodo = (e: React.FormEvent, formData: ITodo) => {
		e.preventDefault();
		console.log(formData);
		socket.emit;
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
			{todos &&
				todos.map((todo: ITodo) => (
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

import React from "react";

type Props = TodoProps & {
	updateTodo: (todo: ITodo) => void;
	deleteTodo: (_id: string) => void;
};

const Todo: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
	const checkTodo: string = todo.status ? `line-through` : "";
	return (
		<div className='Card'>
			<div className='Card--text'>
				<h1 className={checkTodo}>{todo.name}</h1>
				<span className={checkTodo}>{todo.description}</span>
			</div>
			<div className='Card--button'>
				<button
					onClick={() => updateTodo(todo)}
					className={todo.status ? `hide-button` : "Card--button__done"}
				>
					Complete
				</button>
				<button
					onClick={() => deleteTodo(todo._id)}
					className='Card--button__delete'
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default Todo;
