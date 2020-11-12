import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { addTodo, updateTodo, deleteTodo } from "../../API";
import AddTodo from "../AddTodo";
import TodoItem from "../TodoItem";

let socket: SocketIOClient.Socket;
const ENDPOINT = "localhost:4000";
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

	useEffect(() => {
		socket.emit("initial_data", newId);
		socket.on("get_data", (data: ITodoList) => {
			setTodos(data.todos);
		});
	}, [newId, todos]);

	const handleSaveTodo = (e: React.FormEvent, formData: ITodo) => {
		e.preventDefault();
		addTodo(formData, newId)
			.then(({ status, data }) => {
				if (status !== 201) {
					throw new Error("Error! Todo not saved");
				}
				setTodos(data.todos);
			})
			.catch(err => console.log(err));
	};

	const handleUpdateTodo = (todo: ITodo) => {
		updateTodo(todo, newId)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! Todo not updated");
				}
				setTodos(data.todos);
			})
			.catch(err => console.log(err));
	};

	const handleDeleteTodo = (_id: string) => {
		deleteTodo(_id, newId)
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
		</main>
	);
};

export default TodoListId;
