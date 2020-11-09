import React, { useEffect, useState } from "react";
import TodoList from './components/TodoList'
import AddTodoList from "./components/AddTodoList";
import { getTodoLists, addTodoList, updateTodoList, deleteTodoList } from "./API";

const App: React.FC = () => {
	const [todoLists, setTodoLists] = useState<ITodoList[]>([]);

	useEffect(() => {
		fetchTodoLists();
	}, []);

	const fetchTodoLists = () => {
		getTodoLists()
			.then(({ data: { todoLists } }: ITodoList[] | any) => setTodoLists(todoLists))
			.catch((err: Error) => console.log(err));
	};

	const handleSaveTodoList = (e: React.FormEvent, formData: ITodoList) => {
		e.preventDefault();
		addTodoList(formData)
			.then(({ status, data }) => {
				if (status !== 201) {
					throw new Error("Error! TodoList not saved");
				}
				setTodoLists(data.todoLists);
			})
			.catch(err => console.log(err));
	};

	const handleUpdateTodoList = (todoList: ITodoList) => {
		updateTodoList(todoList)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! Todo not updated");
				}
				setTodoLists(data.todoLists);
			})
			.catch(err => console.log(err));
	};

	const handleDeleteTodo = (_id: string) => {
		deleteTodoList(_id)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! Todo not deleted");
				}
				setTodoLists(data.todoLists);
			})
			.catch(err => console.log(err));
	};

	return (
		<main className='App'>
			<h1>Todo Lists</h1>
			<AddTodoList saveTodoList={handleSaveTodoList} />
			{todoLists.map((todoList: ITodoList) => (
				<TodoList
					key={todoList._id}
					updateTodoList={handleUpdateTodoList}
					deleteTodoList={handleDeleteTodo}
					todoList={todoList}
				/>
			))}
		</main>
	);
};

export default App;
