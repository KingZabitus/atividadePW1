import express, { Router, Request, Response } from 'express';
import { Usuario } from '../models/Usuario';
import { Tecnologia } from '../models/Tecnologia';
import { verificarConta } from '../middleware/verificarConta';
import { v4 as uuidv4 } from 'uuid';

const router: Router = express.Router();

router.put('/:id', verificarConta, (req: Request, res: Response) => {
    const { titulo, dataLimite } = req.body;
    const user: Usuario = req.user as Usuario; 
    const tecnologiaId: string = req.params.id;
  
    const tecnologia: Tecnologia | undefined = user.tecnologias.find((tech) => tech.id === tecnologiaId);
  
    if (!tecnologia) {
      return res.status(404).json({ error: 'Tecnologia não encontrada' });
    }
  
    tecnologia.titulo = titulo;
    tecnologia.dataLimite = dataLimite;
    res.status(200).json(tecnologia);
  });

router.post('/', verificarConta, (req: Request, res: Response) => {
    const { titulo, dataLimite } = req.body;
    const user: Usuario = req.user as Usuario; 
    const novaTecnologia: Tecnologia = {
      id: uuidv4(),
      titulo: titulo,
      estudada: false, 
      dataLimite: new Date(dataLimite),
      criadoEm: new Date(),
    };
  
    user.tecnologias.push(novaTecnologia);
    res.status(201).json(novaTecnologia);
  });

router.get('/', verificarConta, (req: Request, res: Response) => {
  const user: Usuario = req.user as Usuario; 
  res.status(200).json(user.tecnologias);
});

router.delete('/:id', verificarConta, (req: Request, res: Response) => {
    const user: Usuario = req.user as Usuario; 
    const tecnologiaId: string = req.params.id;
  
    const index: number = user.tecnologias.findIndex((tech) => tech.id === tecnologiaId);
  
    if (index === -1) {
      return res.status(404).json({ error: 'Tecnologia não Encontrada' });
    }
  
  
    user.tecnologias.splice(index, 1);
    res.status(200).json(user.tecnologias);
  });

router.patch('/:id/studied', verificarConta, (req: Request, res: Response) => {
  const user: Usuario = req.user as Usuario;
  const tecnologiaId: string = req.params.id;

  const tecnologia: Tecnologia | undefined = user.tecnologias.find((tech) => tech.id === tecnologiaId);

  if (!tecnologia) {
    return res.status(404).json({ error: 'Tecnologia não encontrada' });
  }

  tecnologia.estudada = true;
  res.status(200).json(tecnologia);
});

export { router as tecnologiaRoutes };