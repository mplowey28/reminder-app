import styled from 'styled-components'

export const FormContainer = styled.div`
	display: flex;
	justify-content: center;
	text-align: center;
	align-items: center;
	background-color: #333;
    width: 80%;
    margin-top: 20px;
`;

export const CreatedTodoListForm = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
	width: 100%;
`;

export const NameInputContainer = styled.div`
width: 80%`;
export const ButtonInputContainer = styled.div`
width: 20%`;

export const FormInput = styled.input`
	border-radius: 0;
	padding: 15px 20px;
	width: 100%;
`;

export const FormButton = styled.button`
	color: #fff !important;
	text-transform: uppercase;
	background: #2979ff;
	padding: 20px;
	border-radius: 5px;
	border: none;
`;
