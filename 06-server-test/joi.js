// https://medium.com/@diego.coder/validación-de-datos-y-estructuras-en-node-js-con-joi-a157cfc6c4bf

const Joi = require("joi") ;

const customPasswordValidator = (value, helpers) => {
  if (!/[a-z]/.test(value) || !/[A-Z]/.test(value) || !/[0-9]/.test(value)) {
    return helpers.error("password.invalidFormat", { v: value });
  }
  return value;
};

const schema = Joi.object({
  username: Joi.string().trim().min(3).max(30).required(),
  email: Joi.string().email().normalize().required(),
  password: Joi.string().trim().custom(customPasswordValidator).required().escape(),
});

const data = {
  username: "john_doe",
  email: "john@example.com",
  password: "Secure123",
};

const { error, value } = schema.validate(data, { abortEarly: false });

if (error) {
  const errorDetails = error.details.map((err) => {
    if (err.type === "password.invalidFormat") {
      return {
        message:
          "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número.",
      };
    }
    return { message: err.message };
  });
  console.error("Errores de validación:", errorDetails);
} else {
  console.log("Datos válidos:", value);
}
