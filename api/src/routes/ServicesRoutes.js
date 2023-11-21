import { Router } from 'express';
import upload from './services/multer';
import UsersController from '../controllers/UsersController';

const router = Router();

/* MIDDLEWARES */
// import { isAuthenticated } from './middlewares/Auth';

/* ROTA -> UPLOAD DE ARQUIVOS */
router.post('/upload', upload.array('files', 10), (req, res) => res.send('Arquivo recebido...'));

/* ROTA -> ENVIO DE E-MAIL */
router.post('/send', UsersController.sendEmail);

export default router;
