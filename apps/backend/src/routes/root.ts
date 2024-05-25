import path from "node:path";
import { Router } from "express";

const router: Router = Router();

router.get("^/$|/index(.html)?", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

export default router;
