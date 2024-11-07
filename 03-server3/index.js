import express from 'express';
import routes  from './routes/users.js';
const app = express();
const port = 3000;

app.use(express.json());
app.use(routes);

app.listen(port, () => {
 console.log(`Servidor corriendo en http://localhost:${port}`);
});
