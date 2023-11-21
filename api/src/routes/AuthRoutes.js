import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const router = Router();

/* MIDDLEWARES */
// import { isAuthenticated } from './middlewares/Auth';

router.post('/auth/login', UsersController.login);
router.post('/auth/recoverpwd', UsersController.recoverTkPwd);
router.post('/auth/changepwd', UsersController.changePwd);

export default router;
