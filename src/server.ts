import express from 'express';
import { usuarioRoutes } from './routes/usuarioRoutes';
import { tecnologiaRoutes } from './routes/tecnologiaRoutes';

const app = express();

const PORT = 3000;

app.use(express.json());

app.use('/users', usuarioRoutes);
app.use('/technologies', tecnologiaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});