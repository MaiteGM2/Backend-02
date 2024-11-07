import express from 'express';
import routes  from './rest/rest.js';
const app = express();
const port = 3000;

// Middleware para parsear JSON en el cuerpo de la solicitud
app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
 console.log(`Servidor corriendo en http://localhost:${port}`);
});
