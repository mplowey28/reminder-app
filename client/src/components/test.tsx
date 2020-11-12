/* useEffect(() => {
	const { id } = queryString.parse(location.search);
	setId(id);
	socket = io(ENDPOINT);
	socket.emit("initial_data", id);
	socket.on("get_data", getTodoList);
	return () => {
		socket.off("get_data");
		socket.emit("disconnect");
	};

	
}, [ENDPOINT, location.search]); */
