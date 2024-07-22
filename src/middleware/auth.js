import jwt from 'jsonwebtoken';

const BEARER_SCHEMA = 'Bearer';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['Authorization'] || req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Acceso denegado. No se proporcionó token.' });
  }

  const token = authHeader.startsWith(BEARER_SCHEMA) 
    ? authHeader.split(' ')[1] 
    : authHeader;

  if (!token || token.trim() === '') {
    return res.status(401).json({ error: 'Acceso denegado. Formato de token inválido.' });
  }

  try {
    if (!process.env.DB_SECRET_KEY) {
      throw new Error('DB_SECRET_KEY no está definido en las variables de entorno');
    }

    const verified = jwt.verify(token, process.env.DB_SECRET_KEY);
    
    if (Date.now() >= verified.exp * 1000) {
      return res.status(401).json({ error: 'Token expirado' });
    }

    req.userId = verified.userId;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.log('Invalid token:', error.message);
      return res.status(401).json({ error: 'Token no válido' });
    } else if (error instanceof jwt.TokenExpiredError) {
      console.log('Token expired');
      return res.status(401).json({ error: 'Token expirado' });
    }
    console.error('Error in authMiddleware:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};