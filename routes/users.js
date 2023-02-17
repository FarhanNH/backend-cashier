import express from 'express';
import { index, show, store, update, destroy } from '../controllers/UserController.js';

var router = express.Router();

router.get('/', index);
router.post('/', store);
router.put('/:id', update);
router.get('/:id', show);
router.delete('/:id', destroy);

export default router;
