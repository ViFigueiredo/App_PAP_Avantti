import { Router } from 'express';
import HomeController from '../controllers/HomeController';

const router = Router();

/* MIDDLEWARES */
// import { isAuthenticated } from './middlewares/Auth';

router.get('/', HomeController.index);

export default router;
