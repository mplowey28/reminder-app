interface ITodoList {
	_id: string;
	name: string;
	status: boolean;

	todos?: ITodo[];
	createdAt?: string;
	updatedAt?: string;
}

interface TodoListProps {
	todoList: ITodoList;
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
	todoLists: ITodoList[];
	todo?: ITodo;
	todoList?: ITodoList;
};

interface ILocation {
	location: { search: string };
}
