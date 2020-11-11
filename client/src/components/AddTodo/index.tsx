import React, { useState } from "react";

type Props = {
	saveTodo: (e: React.FormEvent, formData: ITodo | any) => void;
};

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
	const [formData, setFormData] = useState<ITodo | {}>();

	const handleForm = (e: React.FormEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.currentTarget.id]: e.currentTarget.value,
		});
	};

	return (
		<form className='Form' onSubmit={e => saveTodo(e, formData)}>
			<div>
				<div>
					<label htmlFor='name'>Name</label>
					<input onChange={handleForm} type='text' id='name' />
				</div>
				<div>
					<label htmlFor='description'>Description</label>
					<input onChange={handleForm} type='text' id='description' />
				</div>
				<div>
					<label htmlFor='cost'>Cost</label>
					<input onChange={handleForm} type='text' id='cost' />
				</div>
			</div>
			<button disabled={formData === undefined ? true : false}>Add Todo</button>
		</form>
	);
};

export default AddTodo;
