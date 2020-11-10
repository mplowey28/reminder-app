import React from "react";
import { Link } from "react-router-dom";

type Props = TodoListProps & {
	updateTodoList: (todoList: ITodoList) => void;
	deleteTodoList: (_id: string) => void;
};

const TodoList: React.FC<Props> = ({ deleteTodoList, todoList }) => {
	const { _id, name, createdAt } = todoList;
	return (
		<div className='Card'>
			<Link to={`/todolists?id=${_id}`}>
				<div>
					<h2>Name: {name}</h2>
				</div>
				<div>
					<h2>Created on: {createdAt}</h2>
				</div>
			</Link>
			<div className='Card--button'>
				<button
					onClick={() => deleteTodoList(_id)}
					className='Card--button__delete'
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default TodoList;
