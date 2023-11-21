import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const router = Router();

/* MIDDLEWARES */
// import { isAuthenticated } from './middlewares/Auth';

router.post('/users', UsersController.create);
router.get('/users', UsersController.index);
router.get('/users/:id', UsersController.byId);
router.put('/users', UsersController.edit);
router.delete('/users/:id', UsersController.remove);

export default router;
