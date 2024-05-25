import type { CorsOptions } from "cors";
import { allowedOrigins } from "./allowed-origins";

export const corsOptions: CorsOptions = {
	origin: (origin, callback) => {
		if ((origin && allowedOrigins.includes(origin)) || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
	optionsSuccessStatus: 200,
};
