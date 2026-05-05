import express from 'express';
import { createUser, getUsers, getUser, updateUser, deleteUser, login } from '../controllers/userDetailsController.js';

const router = express.Router();

// Auth login
router.post('/auth/login', login);

// CRUD for userdetails
router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
