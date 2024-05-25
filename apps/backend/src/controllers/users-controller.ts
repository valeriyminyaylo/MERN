import { hash } from "bcrypt";
import { type RequestHandler } from "express";
import { User } from "../models";

// @desc Get users
// route Get /users
// @access Private
export const getAllUsers: RequestHandler = async (req, res): Promise<void> => {
	const users = await User.find().select("-password").lean();

	if (!users.length) {
		res.status(400).json({ message: "No users found" });
	}

	res.json(users);
};

// @desc Create user
// route POST /users
// @access Private
export const createUser: RequestHandler = async (req, res): Promise<void> => {
	const { name, email, password } = req.body;

	// Confirm data
	if (!name || !email || !password) {
		res.status(400).json({ message: "All fields are required" });
	}

	// Check for duplicates
	const duplicate = await User.findOne({ email }).lean().exec();

	if (duplicate) {
		res.status(409).json({
			message: "User with that email already exists",
		});
	}

	// Hash password
	const hashedPassword = await hash(password, 10);

	const userObject = { name, email, password: hashedPassword };

	// Create and store new user
	const user = await User.create(userObject);

	if (user) {
		// created
		res.status(201).json({ message: `User ${name} created successfully` });
	} else {
		res.status(400).json({ message: "Invalid user data received" });
	}
};

// @desc Update user
// route PATCH /users
// @access Private
export const updateUser: RequestHandler = async (req, res): Promise<void> => {
	const { id, name, email, password } = req.body;

	// Confirm data
	if (!id || !name || !email) {
		res.status(400).json({ message: "All fields are required" });
	}

	const user = await User.findById(id).exec();

	// Check for duplicate
	const duplicate = await User.findOne({ email }).lean().exec();

	// Allow updates to the original user
	if (duplicate && duplicate?._id.toString() !== id) {
		res.status(409).json({ message: "Duplicate user" });
	}

	if (user) {
		user.name = name;
		user.email = email;

		if (password) {
			user.password = await hash(password, 10);
		}

		const updatedUser = await user.save();

		res.json({ message: `User ${updatedUser.name} updated successfully` });
	} else {
		res.status(400).json({ message: "User does not exist" });
	}
};

// @desc Delete user
// route DELETE /users
// @access Private
export const deleteUser: RequestHandler = async (req, res): Promise<void> => {
	const { id } = req.body;

	if (!id) {
		res.status(400).json({ message: "User ID is required" });
	}

	const user = await User.findById(id).exec();

	if (user) {
		await user.deleteOne();

		const reply = `User ${user.name} deleted`;

		res.json(reply);
	} else {
		res.status(400).json({ message: "User does not exist" });
	}
};
