import express from 'express';
import { register, login } from '../controllers/AuthController.js';

var router = express.Router();

router.post('/register', register); // auth/register
router.post('/login', login); // auth/login

export default router;
