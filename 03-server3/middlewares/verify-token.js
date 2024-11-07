import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'Se requiere un token de acceso' });
  
    // Extraer el token omitiendo el prefijo 'Bearer'
    const token = authHeader.split(' ')[1];
  
    jwt.verify(token, 'ariana', (err, decoded) => {
      console.log(decoded);
        if (err) return res.status(403).json({ error: 'Token inválido' });
        //req.userId = decoded.userId;
        req.user = {
          id: decoded.userId,
          role: decoded.role
        }
        next();
    });
  };