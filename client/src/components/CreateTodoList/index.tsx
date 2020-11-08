import React, { useState } from 'react'
import { FormContainer, CreatedTodoListForm, NameInputContainer, ButtonInputContainer, FormInput, FormButton } from './CreateTodoListElements'

type Props = {
	saveTodo: (e: React.FormEvent, formData: ITodo | any) => void;
};

const CreateTodoList = ({}) => {
    const [formData, setFormData] = useState<ITodo | {}>()

    const handleForm = (e: React.FormEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.currentTarget.id]: e.currentTarget.value,
		});
    };
    
	return (
        <FormContainer>
            <CreatedTodoListForm>
                <NameInputContainer>
                    <FormInput onChange={handleForm} type='text' id='name' placeholder ="e.g., Grocery list" />
                </NameInputContainer>
                <ButtonInputContainer>
                    <FormButton disabled={formData === undefined ? true : false}>Create New Todo List</FormButton>
                </ButtonInputContainer>
            </CreatedTodoListForm>
        </FormContainer>
	);
    
}

export default CreateTodoList
