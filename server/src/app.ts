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
	// Returning the initial data of food menu from FoodItems collection
	socket.on("initial_data", id => {
		TodoList.findById(`${id}`).then(docs => {
			io.sockets.emit("get_data", docs);
		});
	});

	/* // Placing the order, gets called from /src/main/PlaceOrder.js of Frontend
	socket.on("putOrder", order => {
		collection_foodItems
			.update({ _id: order._id }, { $inc: { ordQty: order.order } })
			.then(updatedDoc => {
				// Emitting event to update the Kitchen opened across the devices with the realtime order values
				io.sockets.emit("change_data");
			});
	});

	// Order completion, gets called from /src/main/Kitchen.js
	socket.on("mark_done", id => {
		collection_foodItems
			.update({ _id: id }, { $inc: { ordQty: -1, prodQty: 1 } })
			.then(updatedDoc => {
				//Updating the different Kitchen area with the current Status.
				io.sockets.emit("change_data");
			});
	});

	// Functionality to change the predicted quantity value, called from /src/main/UpdatePredicted.js
	socket.on("ChangePred", predicted_data => {
		collection_foodItems
			.update(
				{ _id: predicted_data._id },
				{ $set: { predQty: predicted_data.predQty } }
			)
			.then(updatedDoc => {
				// Socket event to update the Predicted quantity across the Kitchen
				io.sockets.emit("change_data");
			});
	}); */

	// disconnect is fired when a client leaves the server
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

/* io.on("connection", (socket: Socket) => {
	console.log("Connected to Socket!!" + socket.id);

	socket.on("addTodo", Todo => {
		console.log("socketData: " + JSON.stringify(Todo));
	});
	socket.on("disconnect", () => {
		console.log("User has disconnected");
	});
}); */

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
