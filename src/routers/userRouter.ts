import { Router } from "express";
import { check } from 'express-validator';
import UserController from "../controllers/UserController.js";
import { checkRoles } from "../middlewares/authMiddleware.js";


const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoint for managing users
 */

/**
 * @swagger
 * /auth/users:
 *   get:   
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/components/schemas/User'
 */

// Get all users
router.get('/users', UserController.getAllUsers);

/**
 * @swagger
 * /auth/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrive
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: The user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'       
 */
// Get a user by ID
router.get('/users/:id', UserController.getUserById);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
// Register a new user
router.post(
    '/register',
    [
        check('name').notEmpty().withMessage('Name is required'),
        check('email').isEmail().withMessage('Invalid email format'),
        check('password').isLength({ min: 6 })
            .withMessage('Password should be at least 6 chars long'),
        check('role').isIn(['USER', 'ADMIN']).withMessage('Invalid role')
    ],
    UserController.registerUser
);

// Login
router.post(
    '/login',
    [
        check('email').isEmail().withMessage('Invalid email format'),
        check('password').isLength({ min: 6 })
            .withMessage('Password should be at least 6 chars long')
    ],
    UserController.loginUser
);

// Update an existing user
// router.put('/users/:id', (req: Request, res: Response) => {
//     const userId = parseInt(req.params.id);
//     const userIndex: number = users.findIndex(user => user.id === userId);

//     if (userIndex === -1) {
//         return res.status(404).json({ error: 'User not found.' });
//     }

//     const updatedUser: IUser = {
//         id: userId,
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     };

//     users[userIndex] = updatedUser;

//     return res.json(updatedUser);
// });


// Delete a user
router.delete('/users/:id', UserController.deleteUser);

export default router;