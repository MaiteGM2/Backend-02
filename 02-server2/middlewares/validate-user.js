export const validateUser = (req, res, next) => {
    const { username, password } = req.body;
    if (username && password) {
        next(); 
    } else {
        res.status(400).json({ message: 'Faltan datos de usuario' });
    }
};