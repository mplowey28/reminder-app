import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Join from "./components/Join";
import TodoRoom from "./components/TodoList";

const App = () => (
	<Router>
		<Route path='/' exact component={Join} />
		<Route path='/todo' exact component={TodoRoom} />
	</Router>
);
export default App;
