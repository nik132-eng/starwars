// src/server/middleware/errorHandler.ts
import type { ErrorRequestHandler } from 'express';
import { APIError } from '../types';

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req,
  res,
  next
) => {
  if (err instanceof APIError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  next();
};