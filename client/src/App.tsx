import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TodoLists from "./components/TodoLists";
import TodoListId from "./components/TodoListId";

const App = () => {
	return (
		<Router>
			<Route path='/' exact component={TodoLists} />
			<Route path='/todolists' component={TodoListId} />
		</Router>
	);
};

export default App;
