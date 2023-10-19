import { Request, Response, NextFunction } from 'express';
import { Usuario } from '../models/Usuario';

const listaDeUsuarios: Usuario[] = [];

function verificarConta(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { nomeusuario } = req.headers;
  const usuario = listaDeUsuarios.find((u) => u.nomeusuario === nomeusuario);
  if (!usuario) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  req.user = usuario;
  next();
}

export { verificarConta, listaDeUsuarios };