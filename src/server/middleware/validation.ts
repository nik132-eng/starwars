// src/server/middleware/validation.ts
import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validateRequest = <T extends z.ZodSchema>(schema: T) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        next(error);
      }
    }
  };
};