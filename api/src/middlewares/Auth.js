// authMiddleware.js
import jwt from 'jsonwebtoken';

/* JWT SECRET */
const secret = process.env.JWTSECRET;

const isAuthenticated = (req, res, next) => {
  // Recupere o token de autenticação do cabeçalho da solicitação
  const token = req.header('Authorization').slice(8);

  // Verifique se o token existe
  if (!token) {
    return res.status(401).json({ message: 'Acesso não autorizado. Token não fornecido.' });
  }

  try {
    // Verifique se o token é válido e decodifique-o
    const decoded = jwt.verify(token, secret); // Substitua 'seu_segredo_secreto' pelo seu segredo real

    // Você pode fazer verificações adicionais aqui, se desejar, com base nas informações do token decodificado.

    if (decoded != undefined) return next();
  } catch (error) {
    // Se houver um erro ao verificar o token, retorne um erro de autenticação
    res.status(401).json({ message: 'Acesso não autorizado.' });
  }
};

module.exports = { isAuthenticated };
