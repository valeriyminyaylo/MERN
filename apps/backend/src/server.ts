import { json, urlencoded } from "body-parser";
import express, { type Express, static as serveStatic } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { logger, allHandler } from "./middleware";
import { rootRoute, usersRoute } from "./routes";
import { corsOptions } from "./config";

export const createServer = (): Express => {
	const app = express();

	app.use(logger)
		.use("/", serveStatic("public"))
		.use("/", rootRoute)
		.use("/users", usersRoute)
		.all("*", allHandler)
		.use(morgan("dev"))
		.use(cookieParser())
		.use(urlencoded({ extended: true }))
		.use(json())
		.use(cors(corsOptions))
		.disable("x-powered-by");

	return app;
};
