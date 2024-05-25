import { Router } from "express";
import {
	getAllUsers,
	updateUser,
	deleteUser,
	createUser,
} from "../controllers";

const router: Router = Router();

router
	.route("/")
	.get(getAllUsers)
	.post(createUser)
	.patch(updateUser)
	.delete(deleteUser);

export default router;
