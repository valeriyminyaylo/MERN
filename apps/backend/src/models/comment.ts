import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
	{
		name: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		email: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		text: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

export const Comment = mongoose.model("Comment", commentSchema);
