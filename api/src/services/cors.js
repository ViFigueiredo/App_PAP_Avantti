import cors from 'cors';

const whitelist = ['http://localhost:3000']; // Lista de origens permitidas

const corsOptions = {
  origin: (origin, callback) => {
    // Verifique se a origem está na lista branca, ou se é uma solicitação não segura (sem um origin header, como requisições de fetch no Node.js)
    if (!origin || whitelist.includes(origin)) {
      callback(null, true); // Permita a solicitação
    } else {
      callback(new Error('Acesso não autorizado')); // Bloqueie a solicitação
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
  preflightContinue: false,
  optionsSuccessStatus: 204, // Código de status de sucesso para solicitações OPTIONS
  credentials: true, // Habilitar suporte para credenciais (cookies, tokens, etc.)
};

export default cors(corsOptions);
