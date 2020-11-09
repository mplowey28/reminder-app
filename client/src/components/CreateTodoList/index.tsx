import React, { useState } from 'react'
import { FormContainer, CreatedTodoListForm, NameInputContainer, ButtonInputContainer, FormInput, FormButton } from './CreateTodoListElements'

type Props = {
	saveTodoList: (todoListName: ITodoListName | any) => void;
};

const CreateTodoList:React.FC<Props> = ({ saveTodoList }) => {
    const [todoListName, setTodoListName] = useState<ITodoListName | {}>()

    const handleForm = (e: React.FormEvent<HTMLInputElement>) => {
        setTodoListName(e.currentTarget.value)
    };
    
	return (
        <FormContainer onSubmit={() => saveTodoList(todoListName)}>
            <CreatedTodoListForm>
                <NameInputContainer>
                    <FormInput onChange={handleForm} type='text' id='name' placeholder ="e.g., Grocery list" required/>
                </NameInputContainer>
                <ButtonInputContainer>
                    <FormButton>Create New Todo List</FormButton>
                </ButtonInputContainer>
            </CreatedTodoListForm>
        </FormContainer>
	);
    
}

export default CreateTodoList
