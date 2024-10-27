// src/server/controllers/pdfController.ts
import type { Request, Response, NextFunction } from 'express';
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import type { PDF, Comment, MulterFile } from '../types';
import { APIError } from '../types';
import pool from '@/db';
import s3Client from '@/s3';

export const listPDFs = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { rows } = await pool.query<PDF>('SELECT * FROM pdfs ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const uploadPDF = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title } = req.body;
    const file = req.file as MulterFile | undefined;

    if (!file) {
      throw new APIError(400, 'File is required');
    }

    if (!title) {
      throw new APIError(400, 'Title is required');
    }

    const fileName = `${Date.now()}-${file.originalname}`;
    const bucketName = process.env.VITE_AWS_BUCKET_NAME;
    const region = process.env.VITE_AWS_REGION;

    if (!bucketName || !region) {
      throw new APIError(500, 'AWS configuration missing');
    }

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await s3Client.send(command);

    const fileUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
    const { rows } = await pool.query<PDF>(
      'INSERT INTO pdfs (title, file_url) VALUES ($1, $2) RETURNING *',
      [title, fileUrl]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const votePDF = async (req: Request, res: Response, next: NextFunction) => {
  const client = await pool.connect();
  try {
    const { id } = req.params;
    const { userId, voteType } = req.body;

    await client.query('BEGIN');

    await client.query(
      'INSERT INTO user_votes (user_id, pdf_id, vote_type) VALUES ($1, $2, $3) ON CONFLICT (user_id, pdf_id) DO UPDATE SET vote_type = $3',
      [userId, id, voteType]
    );

    const { rows } = await client.query<PDF>(
      `UPDATE pdfs 
       SET upvotes = (SELECT COUNT(*) FROM user_votes WHERE pdf_id = $1 AND vote_type = 'up'),
           downvotes = (SELECT COUNT(*) FROM user_votes WHERE pdf_id = $1 AND vote_type = 'down')
       WHERE id = $1 
       RETURNING *`,
      [id]
    );

    if (rows.length === 0) {
      throw new APIError(404, 'PDF not found');
    }

    await client.query('COMMIT');
    res.json(rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    next(error);
  } finally {
    client.release();
  }
};

export const addComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { userId, content } = req.body;

    const { rows } = await pool.query<Comment>(
      'INSERT INTO comments (pdf_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
      [id, userId, content]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const { rows } = await pool.query<Comment>(
      'SELECT * FROM comments WHERE pdf_id = $1 ORDER BY created_at DESC',
      [id]
    );

    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const downloadPDF = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query<Pick<PDF, 'file_url'>>(
      'SELECT file_url FROM pdfs WHERE id = $1',
      [id]
    );

    if (!rows || rows.length === 0) {
      throw new APIError(404, 'PDF not found');
    }

    const { file_url: fileUrl } = rows[0];
    if (!fileUrl) {
      throw new APIError(500, 'Invalid file URL');
    }

    const urlParts = fileUrl.split('/');
    const key = urlParts[urlParts.length - 1];

    const bucketName = process.env.VITE_AWS_BUCKET_NAME;
    if (!bucketName) {
      throw new APIError(500, 'AWS configuration missing');
    }

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const s3Response = await s3Client.send(command);
    const { Body } = s3Response;

    if (!Body || !(Body instanceof ReadableStream)) {
      throw new APIError(500, 'Failed to retrieve PDF stream');
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${key}"`);

    const stream = Body.getReader();

    const pump = async (): Promise<void> => {
      const { done, value } = await stream.read();
      if (done) {
        res.end();
        return;
      }
      res.write(Buffer.from(value));
      return pump();
    };

    await pump();
  } catch (error) {
    next(error);
  }
};