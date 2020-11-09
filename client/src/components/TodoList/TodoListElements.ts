import styled from "styled-components";
import { Link } from 'react-router-dom'

export const TodoListOuterContainer = styled.ul`
    display: flex;
    flex-direction: row;
	justify-content: center;
	align-items: center;
	background-color: #444;
    width: 100%;
`

export const TodoListInnerContainer = styled(Link)`
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
	&:hover {
		transition: all 0.2s ease-in-out;
		background: #f3f3f3;
	}
	&:hover,
	&:visited,
	&:link,
	&:active {
		text-decoration: none;
		color: #2e2e2e;
	}
`

export const TodoListNameContainer = styled.div`
    text-align: left;
	align-items: center;
    width: 60%;
`

export const TodoListDateContainer = styled.div`
    width: 30%;
`

export const Name = styled.h2`

`
