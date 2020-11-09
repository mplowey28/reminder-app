import express, { Express } from "express";
import BodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import socket from "socket.io";

import todoRoutes from "./routes";

const app: Express = express();
const server = http.createServer(app);
const io = socket(server);

const PORT: string | number = process.env.PORT || 4000;

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
