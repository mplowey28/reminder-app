"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const routes_1 = __importDefault(require("./routes"));
const todoList_1 = __importDefault(require("./models/todoList"));
const PORT = process.env.PORT || 4000;
const app = express_1.default();
const server = http_1.default.createServer(app);
const io = socket_io_1.default(server);
io.on("connection", socket => {
    console.log("New client connected" + socket.id);
    socket.on("initial_data", id => {
        todoList_1.default.findById(id)
            .then(docs => {
            socket.emit("get_data", docs);
        })
            .catch(err => console.log(err));
    });
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(routes_1.default);
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.cdfh2.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose_1.default.set("useFindAndModify", false);
mongoose_1.default.connect(uri, options).catch(error => {
    throw error;
});
server.listen(PORT, () => {
    console.log(`App Server Listening at ${PORT}`);
});
