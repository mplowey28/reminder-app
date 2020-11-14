import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { addTodo, updateTodo, deleteTodo } from "../../API";
import AddTodo from "../AddTodo";
import TodoItem from "../TodoItem";

let socket: SocketIOClient.Socket;
const ENDPOINT = "https://react-reminder-app.herokuapp.com/";
socket = io(ENDPOINT);

type Props = TodoProps &
	TodoListProps & {
		updateTodo: (todo: ITodo) => void;
		deleteTodo: (_id: string) => void;
	};

const TodoListId: React.FC<ILocation & Props> = ({ location }) => {
	const queryData = queryString.parse(location.search);
	const newId: any = queryData.id;
	const [todos, setTodos] = useState<ITodo[] | undefined>([]);

	const getTodos = () => {
		socket.emit("fetch_data", newId);
	};

	useEffect(() => {
		getTodos();
	}, [newId]);

	useEffect(() => {
		socket.on("get_data", (data: ITodoList) => {
			setTodos(data.todos);
		});
	}, []);

	const handleSaveTodo = (e: React.FormEvent, formData: ITodo) => {
		e.preventDefault();
		addTodo(formData, newId)
			.then(({ status }) => {
				if (status !== 201) {
					throw new Error("Error! Todo not saved");
				}
				getTodos();
			})
			.catch(err => console.log(err));
	};

	const handleUpdateTodo = (todo: ITodo) => {
		updateTodo(todo, newId)
			.then(({ status }) => {
				if (status !== 200) {
					throw new Error("Error! Todo not updated");
				}
				getTodos();
			})
			.catch(err => console.log(err));
	};

	const handleDeleteTodo = (_id: string) => {
		deleteTodo(_id, newId)
			.then(({ status }) => {
				if (status !== 200) {
					throw new Error("Error! Todo not deleted");
				}
				getTodos();
			})
			.catch(err => console.log(err));
	};

	const costs = todos
		? todos
				.map(item => (item.cost ? item.cost : 0))
				.reduce(
					(prev, next) =>
						Number(prev !== undefined ? prev : 0) +
						Number(next !== undefined ? next : 0),
					0
				)
		: 0;
	return (
		<main className='App'>
			<AddTodo saveTodo={handleSaveTodo} />
			{!todos ? (
				<h1>No todos</h1>
			) : (
				todos.map((todo: ITodo) => (
					<TodoItem
						key={todo._id}
						todo={todo}
						updateTodo={handleUpdateTodo}
						deleteTodo={handleDeleteTodo}
					/>
				))
			)}
			<div className='cost'>
				{todos !== undefined ? <h3>total costs: {costs}</h3> : null}
			</div>
		</main>
	);
};

export default TodoListId;
