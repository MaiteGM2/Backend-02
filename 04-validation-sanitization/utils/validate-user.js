import pkg from 'express-validator';
const { body, sanitizeBody} = pkg;


// Middleware de validación y sanitización
const validateUser = [
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isString().withMessage('El nombre debe ser una cadena de texto')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
    .trim().escape(),

  body('email')
    .isEmail().withMessage('Debe ser un correo electrónico válido')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
    .matches(/[0-9]/).withMessage('La contraseña debe contener al menos un número')
    .trim().escape(),

  body('role')
    .optional()
    .isIn(['ADMIN', 'USER']).withMessage('El rol debe ser uno de los siguientes: ADMIN, USER')
    .trim().escape(),
];

export default validateUser;
