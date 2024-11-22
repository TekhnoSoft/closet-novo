require('dotenv').config();

module.exports = (req, res, next) => {
    const apiKey = req.header('api-key');
    const origin = req.header('Origin');
    if (apiKey === process.env.API_KEY && (origin === process.env.ALLOWED_ORIGIN || origin === process.env.LOCAL_ALLOWED_ORIGIN)) {
      next()
    } else {
      res.status(403).json({ message: 'Acesso negado: chave de API ou origem inválida.' });
    }
};