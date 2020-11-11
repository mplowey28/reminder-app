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
    // Returning the initial data of food menu from FoodItems collection
    socket.on("initial_data", id => {
        todoList_1.default.findById(`${id}`).then(docs => {
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
