import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const apiKeys: { [key: string]: string } = {
  valid_key_1: process.env.RANDOM_NUMBER as string,
  // Adicione outras chaves válidas, se necessário
};

export function authenticateAPIKey(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const apiKey: string = req.headers['x-api-key'] as string;

  if (apiKey !== apiKeys.valid_key_1) {
    return res.status(401).json({ error: 'Chave de API inválida ou ausente.' });
  }

  (req as any).user = apiKey;
  next();
}
