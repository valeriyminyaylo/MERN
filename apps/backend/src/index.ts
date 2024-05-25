import mongoose from "mongoose";
import { log } from "@repo/logger";
import { createServer } from "./server";
import { connectDB } from "./config";
import { logEvents } from "./middleware";

const port = process.env.PORT || 5001;
const server = createServer();

connectDB().catch((err) => {
	log(`Connect to DB error: ${err}`);
});

mongoose.connection.once("open", () => {
	server.listen(port, () => {
		log(`Listening on port ${port}`);
	});
});

mongoose.connection.on("error", (err) => {
	logEvents(
		`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
		"mongoErrLog.log",
	).catch((err) => {
		log(`Error with connection to DB: ${err}`);
	});
});
