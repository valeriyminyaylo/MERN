import mongoose from "mongoose";
import { log } from "@repo/logger";

export const connectDB = async (): Promise<void> => {
	try {
		const dbURL = process.env.DATABASE_URL;

		if (dbURL) await mongoose.connect(dbURL);
	} catch (e) {
		log(e);
	}
};
