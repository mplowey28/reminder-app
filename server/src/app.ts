import express, { Express } from "express";
import BodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import ioserver, { Socket } from "socket.io";
import todoRoutes from "./routes";
import Todo from "./models/todo";
import TodoList from "./models/todoList";
import { ITodo, ITodoList } from "./types/todo";

const PORT: string | number = process.env.PORT || 4000;

const app: Express = express();
const server = http.createServer(app);
const io = ioserver(server);

io.on("connection", socket => {
	console.log("New client connected" + socket.id);
	socket.on("initial_data", id => {
		TodoList.findById(id)
			.then(docs => {
				socket.emit("get_data", docs);
			})
			.catch(err => console.log(err));
	});
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

app.use(cors());
app.use(BodyParser.json());
app.use(todoRoutes);
const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.cdfh2.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set("useFindAndModify", false);

mongoose.connect(uri, options).catch(error => {
	throw error;
});

server.listen(PORT, () => {
	console.log(`App Server Listening at ${PORT}`);
});
