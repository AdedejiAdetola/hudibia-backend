import express from 'express';
import { signup } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup) //second argument imported from controller

export default router;