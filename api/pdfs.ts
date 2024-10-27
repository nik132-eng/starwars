import { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import s3Client from '../src/s3';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const { rows } = await sql`SELECT * FROM pdfs ORDER BY created_at DESC`;
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, file } = req.body;

      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET as string,
        Key: file.name,
        Body: Buffer.from(file.data, 'base64'),
        ContentType: file.type,
      });

      await s3Client.send(command);

      const { rows } = await sql`
        INSERT INTO pdfs (title, file_url)
        VALUES (${title}, ${`https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${file.name}`})
        RETURNING *
      `;

      res.status(201).json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}