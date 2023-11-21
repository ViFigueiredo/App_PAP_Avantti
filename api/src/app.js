import express from 'express';
import helmet from 'helmet';
import cors from './services/cors';
import routes from './router';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors);
app.use(helmet());
app.use(routes);

export default app;
