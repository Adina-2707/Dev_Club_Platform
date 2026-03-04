import express from 'express';
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser
} from '../controllers/user.controller.js';

// basic request validation for creation
const validateUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
    return res.status(400).json({ message: 'Invalid user data; email and password must be strings' });
  }
  next();
};

// simple validation for updates (fields optional but must be strings if present)
const validateUpdate = (req, res, next) => {
  const { email, password } = req.body;
  if (email !== undefined && typeof email !== 'string') {
    return res.status(400).json({ message: 'Email must be a string' });
  }
  if (password !== undefined && typeof password !== 'string') {
    return res.status(400).json({ message: 'Password must be a string' });
  }
  next();
};

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', validateUser, createUser);
router.put('/:id', validateUpdate, updateUser);
router.delete('/:id', deleteUser);

export default router;