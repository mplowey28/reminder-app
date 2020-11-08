import React, { useState } from "react";
import CreateTodoList from "../CreateTodoList";

import {
	JoinOuterContainer,
	Heading,
} from "./JoinElements";

const Join = () => {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");

	return (
		<JoinOuterContainer>
			<CreateTodoList />
			<Heading>- - - or join a previous todo list - - - </Heading>
		</JoinOuterContainer>
	);
};

export default Join;
