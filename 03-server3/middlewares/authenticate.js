export const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token && token === 'Bearer token123') {
        next(); 
    } else {
        res.status(401).json({ message: 'No autorizado' }); 
    }
};