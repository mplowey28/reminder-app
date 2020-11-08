import React from "react";
import { FaTrash } from 'react-icons/fa'
import { TodoListOuterContainer, TodoListInnerContainer, TodoListNameContainer, TodoListDateContainer, Name} from './TodoListElements'

type Props = TodoListProps

const TodoList: React.FC<Props> = ({ todoList }) => {
	return (
		<TodoListOuterContainer>
			<TodoListInnerContainer to={`/${todoList.name}`}>
				<TodoListNameContainer>
					<Name>{todoList.name}</Name>
				</TodoListNameContainer>
				<TodoListDateContainer>
					<Name>{todoList.createdAt}</Name>
				</TodoListDateContainer>
				<FaTrash />
			</TodoListInnerContainer>
		</TodoListOuterContainer>
	);
};

export default TodoList;
