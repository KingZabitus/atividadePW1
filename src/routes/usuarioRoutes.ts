import express, { Router, Request, Response } from 'express';
import { Usuario } from '../models/Usuario';
import { verificarConta, listaDeUsuarios } from '../middleware/verificarConta';
import { v4 as uuidv4 } from 'uuid';

const router: Router = express.Router();
const usuarios = listaDeUsuarios

router.post('/', (req: Request, res: Response) => {
  const { nome, nomeusuario } = req.body;

  const usuarioExistente = usuarios.find((user) => user.nomeusuario === nomeusuario);
  if (usuarioExistente) {
    return res.status(400).json({ error: 'Nome de usuário já utilizado' });
  }
  const novoUsuario: Usuario = {
    id: uuidv4(),
    nome: nome,
    nomeusuario: nomeusuario,
    tecnologias: [],
  };

  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

router.get('/', (req: Request, res: Response) => {
  res.status(200).json(usuarios);
});

router.get('/validate', verificarConta, (req: Request, res: Response) => {
  res.status(200).json({ message: 'Este usuário já existe' });
});

export { router as usuarioRoutes };