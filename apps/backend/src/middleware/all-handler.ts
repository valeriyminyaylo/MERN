import path from "node:path";
import { type RequestHandler } from "express";

export const allHandler: RequestHandler = (req, res) => {
	res.status(404);

	if (req.accepts("html")) {
		res.sendFile(path.join(__dirname, "..", "public", "404.html"));
	} else if (req.accepts("json")) {
		res.json({ message: "404 Not Found" });
	} else {
		res.type("txt").send("404 Not Found");
	}
};
