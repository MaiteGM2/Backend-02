export const validateUser = (req, res, next) => {
    const { username, password, email } = req.body;
    if (username && password && email) {
        next(); 
    } else {
        res.status(400).json({ message: 'Faltan datos de usuario' });
    }
};