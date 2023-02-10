import express from 'express';
import { index } from '../controllers/UserController.js';

var router = express.Router();

router.get('/', index);

export default router;
