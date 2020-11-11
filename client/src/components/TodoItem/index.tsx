import React from "react";

const Todo: React.FC<TodoProps> = ({ todo }) => {
	const checkTodo: string = todo.status ? `line-through` : "";
	return (
		<div className='Card'>
			<div className='Card--text'>
				<h1 className={checkTodo}>{todo.name}</h1>
				<span className={checkTodo}>{todo.description}</span>
			</div>
			<div className='Card--button'>
				<button className={todo.status ? `hide-button` : "Card--button__done"}>
					Complete
				</button>
				<button className='Card--button__delete'>Delete</button>
			</div>
		</div>
	);
};

export default Todo;
