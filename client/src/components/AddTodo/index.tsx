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
				<input onChange={handleForm} type='text' id='name' placeholder='Name' />
			</div>
			<div>
				<input
					onChange={handleForm}
					type='text'
					id='description'
					placeholder='Description...'
				/>
			</div>
			<div>
				<input onChange={handleForm} type='text' id='cost' placeholder='Cost' />
			</div>
			<div>
				<button disabled={formData === undefined ? true : false}>
					Add Todo
				</button>
			</div>
		</form>
	);
};

export default AddTodo;
