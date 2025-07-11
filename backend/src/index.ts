import dotenv from 'dotenv';

dotenv.config({
  path: './.env',
});

import express, { Request, Response } from 'express';
import cors from 'cors';
import { AIService } from './services';

const app = express();
app.use(cors())
const port = 3010;

app.use(express.json());

app.post('/prompt', async (req: Request, res: Response) => {
  const getIAAnswer = await AIService.prompt({ ...req.body })

  res.json(getIAAnswer)
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
