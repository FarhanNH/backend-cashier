import express from 'express';
import { register } from '../controllers/AuthController.js';

var router = express.Router();

router.post('/register', register); // auth/register

export default router;
