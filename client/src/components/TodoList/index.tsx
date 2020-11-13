import React from "react";
import { Link } from "react-router-dom";

type Props = TodoListProps & {
	deleteTodoList: (_id: string) => void;
};

const TodoList: React.FC<Props> = ({ deleteTodoList, todoList }) => {
	const { _id, name, createdAt } = todoList;
	return (
		<div className='Card'>
			<Link to={`/todolists?id=${_id}`} className='todolist-link'>
				<div>
					<h2>Name: {name}</h2>
				</div>
				<div>
					<h2>
						Created on:{" "}
						{createdAt !== undefined ? createdAt.substr(0, 10) : null}
					</h2>
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
