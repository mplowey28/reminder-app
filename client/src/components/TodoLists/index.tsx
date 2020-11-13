import React, { useEffect, useState } from "react";
import TodoList from "../TodoList";
import AddTodoList from "../AddTodoList";
import { getTodoLists, addTodoList, deleteTodoList } from "../../API";

const App: React.FC = () => {
	const [todoLists, setTodoLists] = useState<ITodoList[]>([]);

	useEffect(() => {
		fetchTodoLists();
	}, []);

	const fetchTodoLists = () => {
		getTodoLists()
			.then(({ data: { todoLists } }: ITodoList[] | any) =>
				setTodoLists(todoLists)
			)
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
				fetchTodoLists();
			})
			.catch(err => console.log(err));
	};

	const handleDeleteTodo = (_id: string) => {
		deleteTodoList(_id)
			.then(({ status, data }) => {
				if (status !== 200) {
					throw new Error("Error! TodoList not deleted");
				}
				setTodoLists(data.todoLists);
				fetchTodoLists();
			})
			.catch(err => console.log(err));
	};
	console.log(todoLists);
	return (
		<main className='App'>
			<AddTodoList saveTodoList={handleSaveTodoList} />
			{todoLists &&
				todoLists.map((todoList: ITodoList) => (
					<TodoList
						key={todoList._id}
						deleteTodoList={handleDeleteTodo}
						todoList={todoList}
					/>
				))}
		</main>
	);
};

export default App;
