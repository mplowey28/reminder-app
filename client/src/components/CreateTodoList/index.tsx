import React, { useState } from 'react'
import { FormContainer, CreatedTodoListForm, NameInputContainer, ButtonInputContainer, FormInput, FormButton } from './CreateTodoListElements'

type Props = {
	saveTodo: (e: React.FormEvent, formData: ITodo | any) => void;
};

const CreateTodoList = ({}) => {
    const [todoListName, setTodoListName] = useState<ITodoListName | {}>()

    const handleForm = (e: React.FormEvent<HTMLInputElement>) => {
		setTodoListName({...todoListName, [e.currentTarget.name]: e.currentTarget.value,});
    };
    
	return (
        <FormContainer>
            <CreatedTodoListForm>
                <NameInputContainer>
                    <FormInput onChange={handleForm} type='text' id='name' placeholder ="e.g., Grocery list" required/>
                </NameInputContainer>
                <ButtonInputContainer>
                    <FormButton disabled={todoListName === undefined ? true : false}>Create New Todo List</FormButton>
                </ButtonInputContainer>
            </CreatedTodoListForm>
        </FormContainer>
	);
    
}

export default CreateTodoList
