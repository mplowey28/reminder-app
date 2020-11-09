import { Document } from "mongoose";

export interface ITodo extends Document {
	name: string;
	description: string;
	status: boolean;
}

export interface ITodoList extends Document {
	name: string;
	status: boolean;
}
