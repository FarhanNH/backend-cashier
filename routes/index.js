import express from 'express';
import categories from './categories.js';

var router = express.Router();

router.use('/categories', categories);

export default router;
