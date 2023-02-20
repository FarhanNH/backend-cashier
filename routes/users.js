import express from 'express';
import { index, show, store, update, destroy } from '../controllers/UserController.js';
import jwtAuth from '../middlewares/jwtAuth.js';
import role from '../middlewares/role.js';

var router = express.Router();

router.get('/', [jwtAuth(), role(['admin'])], index);
router.post('/', [jwtAuth(), role(['admin'])], store);
router.put('/:id', [jwtAuth(), role(['admin'])], update);
router.get('/:id', [jwtAuth(), role(['admin'])], show);
router.delete('/:id', [jwtAuth(), role(['admin'])], destroy);

export default router;
