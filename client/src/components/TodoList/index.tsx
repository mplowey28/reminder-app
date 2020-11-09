import React, { useEffect, useState } from "react";
import TodoItem from '../TodoItem'
import AddTodo from "../AddTodoItem";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../../API";

type Props = TodoListProps & {
	updateTodoList: (todoList: ITodoList) => void;
	deleteTodoList: (_id: string) => void;
};

const TodoList: React.FC<Props> = ({ deleteTodoList, todoList }) => {
	const [todos, setTodos] = useState<ITodo[]>([]);

	useEffect(() => {
		fetchTodos();
	}, []);

	const fetchTodos = () => {
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
					updateTodo={handleUpdateTodo}
					deleteTodo={handleDeleteTodo}
					todo={todo}
				/>
				
			))}
		</main>
	);
};

export default TodoList;