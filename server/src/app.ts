import express, { Express } from "express";
import BodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import ioserver, { Socket } from "socket.io";
import todoRoutes from "./routes";
import TodoList from "./models/todoList";
import * as dotenv from "dotenv";
import helmet from "helmet";
dotenv.config();

const PORT: string | number = process.env.PORT || 4000;
const app: Express = express();
const server = http.createServer(app);
const io = ioserver(server);

app.use(helmet());
app.use(cors());
app.use(BodyParser.json());
app.use(todoRoutes);

io.on("connection", socket => {
	console.log("New client connected" + socket.id);
	socket.on("fetch_data", id => {
		TodoList.findById(id)
			.then(docs => {
				socket.emit("get_data", docs);
				socket.broadcast.emit("get_data", docs);
			})
			.catch(err => console.log(err));
	});
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

const DBUSER = process.env.MONGO_USER;
const DBPASSWORD = process.env.MONGO_PASSWORD;
const DBNAME = process.env.MONGO_DB;

const uri: string = `mongodb+srv://${DBUSER}:${DBPASSWORD}@cluster0.cdfh2.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set("useFindAndModify", false);

mongoose.connect(uri, options).catch(error => {
	throw error;
});

app.use((req, res) => {
	res.end("Page Not Found");
});

server.listen(process.env.PORT || PORT, () => {
	console.log(`App Server Listening at ${PORT}`);
});
