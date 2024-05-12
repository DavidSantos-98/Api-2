import { Router } from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const router = Router();
const SECRET_KEY = process.env.SECRET_KEY || "";
const users = [
    { id: 1, name: "Pedro", email: "pedro@test.pt", password: "123456" },
    { id: 2, name: "João", email: "joao@outlook.pt", password: "654321" },
];
// Get all users
router.get("/users", (req, res) => {
    console.log(`Request method: ${req.method}`);
    console.log(`Request URL: ${req.originalUrl}`);
    console.log(`Request parameters:`);
    console.log(req.query);
    if (users.length === 0) {
        return res.status(204).json({ message: "No users found." });
    }
    else {
        return res.json(users);
    }
});
// Get a user by ID
router.get("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);
    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }
    return res.json(user);
});
// Update an existing user
router.put("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found." });
    }
    const updatedUser = {
        id: userId,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };
    users[userIndex] = updatedUser;
    return res.json(updatedUser);
});
// Register a new user
router.post("/register", [
    check("email").isEmail().withMessage("Invalid email."),
    check("password")
        .isLength({ min: 5, max: 10 })
        .withMessage("Pwd should have 5 to 10 chars"),
    check("name")
        .isLength({ min: 10 })
        .withMessage("Name should have at least 10 chars"),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const foundUser = users.find((user) => user.email === req.body.email);
    if (foundUser) {
        return res.status(400).json({ error: "User already exists." });
    }
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };
    users.push(newUser);
    const token = jwt.sign({ id: newUser.id }, String(SECRET_KEY));
    return res.status(201).json({ accessToken: token });
});
// Login
router.post("/login", [
    check("email").isEmail().withMessage("Invalid email."),
    check("password")
        .isLength({ min: 5, max: 10 })
        .withMessage("Invalid password"),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const foundUser = users.find((user) => user.email === req.body.email);
    if (!foundUser) {
        return res.status(404).json({ error: "User not found." });
    }
    if (req.body.password !== foundUser.password) {
        return res.status(400).json({ error: "Invalid password." });
    }
    const token = jwt.sign({ id: foundUser.id }, String(SECRET_KEY));
    return res.json({ accessToken: token });
});
// Delete a user
router.delete("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found." });
    }
    const deletedUser = users.splice(userIndex, 1);
    return res.json(deletedUser);
});
export default router;
