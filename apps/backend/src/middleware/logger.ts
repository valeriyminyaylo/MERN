import path from "node:path";
import fs from "node:fs";
import { type RequestHandler } from "express";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import { log } from "@repo/logger";

const fsPromises = fs.promises;

export const logEvents = async (
	message: string,
	logFileName: string,
): Promise<void> => {
	const dateTime = format(new Date(), "yyyy-MM-dd hh:mm:ss");
	const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

	try {
		if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
			await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
		}

		await fsPromises.appendFile(
			path.join(__dirname, "..", "logs", logFileName),
			logItem,
		);
	} catch (e) {
		log(e);
	}
};

export const logger: RequestHandler = async (req, _, next): Promise<void> => {
	await logEvents(
		`${req.method}\t${req.url}\t${req.headers.origin}`,
		"reqLog.log",
	);

	log(`${req.method} ${req.path}`);

	next();
};
