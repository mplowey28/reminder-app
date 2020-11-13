import React, { useState } from "react";

type Props = {
	saveTodoList: (e: React.FormEvent, formData: ITodoList | any) => void;
};

const AddTodoList: React.FC<Props> = ({ saveTodoList }) => {
	const [formData, setFormData] = useState<ITodo | {}>();

	const handleForm = (e: React.FormEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.currentTarget.id]: e.currentTarget.value,
		});
	};

	return (
		<form className='Form' onSubmit={e => saveTodoList(e, formData)}>
			<div>
				<div>
					<input
						placeholder='e.x., Grocery list'
						onChange={handleForm}
						type='text'
						id='name'
						required
					/>
				</div>
			</div>
			<button>Create Todo List</button>
		</form>
	);
};

export default AddTodoList;
