import React, { useState } from "react";
import CreateTodoList from "../CreateTodoList";
import TodoList from '../TodoList'

import {
	JoinOuterContainer,
	Heading,
	TodoListsContainer
} from "./JoinElements";

const Join: React.FC = () => {
	const [todoLists, setTodoLists] = useState<ITodoListName[]>([{
		_id: 'alkjflda',
		name: 'test',
		todos: [],
		createdAt: '14134314',
		updatedAt: '1531541',
	}]);

	const handleSaveTodo = (todoListName: ITodoListName) => {
		console.log(todoListName);
	};

	return (
		<JoinOuterContainer>
			<CreateTodoList saveTodoList={handleSaveTodo}/>
			<Heading>- - - or join a previous todo list - - - </Heading>
			<TodoListsContainer>
			{todoLists.map((todoList: ITodoListName) => (
				<TodoList
					key={todoList._id}
					todoList={todoList}
				/>
			))}
			</TodoListsContainer>
		</JoinOuterContainer>
	);
};

export default Join;
