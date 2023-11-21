const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    client: process.env.DATABASE_DIALECT,
    connection: {
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
    },
    migrations: {
      directory: './src/migrations/', // Diretório onde as migrações serão armazenadas
    },
  },
};
