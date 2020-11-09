interface ITodoListName {
	_id?: string;
	name: string;
	todos?: ITodo[]
	createdAt?: string;
	updatedAt?: string;
}

interface TodoListProps {
	todoList: ITodoListName
}

interface ITodo {
	_id: string;
	name: string;
	description: string;
	status: boolean;
	cost: number;
	createdAt?: string;
	updatedAt?: string;
}

interface TodoProps {
	todo: ITodo;
}

type ApiDataType = {
	message: string;
	status: string;
	todos: ITodo[];
	todo?: ITodo;
};
