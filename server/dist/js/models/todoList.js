"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const todoListSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    todos: [],
    status: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.model("TodoList", todoListSchema);
