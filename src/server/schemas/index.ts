// src/server/schemas/index.ts
import { z } from 'zod';

export const voteSchema = z.object({
  userId: z.string(),
  voteType: z.enum(['up', 'down'])
});

export const commentSchema = z.object({
  userId: z.string(),
  content: z.string().min(1)
});