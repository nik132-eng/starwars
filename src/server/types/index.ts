// src/server/types/index.ts
import { z } from 'zod';
import { voteSchema, commentSchema } from '../schemas';


export interface PDF {
  id: string;
  title: string;
  file_url: string;
  upvotes: number;
  downvotes: number;
  created_at: Date;
}

export interface Comment {
  id: string;
  pdf_id: string;
  user_id: string;
  content: string;
  created_at: Date;
}

export interface MulterFile extends Express.Multer.File {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
}

export type VoteBody = z.infer<typeof voteSchema>;
export type CommentBody = z.infer<typeof commentSchema>;
  
export class APIError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'APIError';
  }
}