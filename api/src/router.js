import { Router } from 'express';

import homeRoutes from './routes/HomeRoutes';
import usersRoutes from './routes/UsersRoutes';

const router = Router();

router.use(homeRoutes); /* página inicial */
router.use(usersRoutes); /* funcionarios e usuarios */

export default router;
