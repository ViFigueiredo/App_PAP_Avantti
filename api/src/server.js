import * as dotenv from 'dotenv';
dotenv.config();

import app from './app';

const port = process.env.APP_PORT;
const host = process.env.APP_HOST;

app.listen(port, () => {
  console.log(`[+][SRV] -> ${host}:${port}`);
});
