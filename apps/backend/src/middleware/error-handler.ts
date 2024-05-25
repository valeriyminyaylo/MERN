import { type ErrorRequestHandler } from "express";
import { log } from "@repo/logger";
import { logEvents } from "./logger.ts";

const errorHandler: ErrorRequestHandler = async (err, req, res, _) => {
	await logEvents(
		`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
		"errLog.log",
	);

	log(err.stack);

	const status = req.statusCode ? res.statusCode : 500; // server error

	res.status(status);

	res.json({ message: err.message });
};

module.exports = errorHandler;
