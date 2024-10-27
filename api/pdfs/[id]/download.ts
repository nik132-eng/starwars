import { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';
import { GetObjectCommand } from "@aws-sdk/client-s3";
import s3Client from '../../../src/s3';
import { useParams } from 'react-router-dom';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const { id } = useParams<{ id: string }>();
      const { rows } = await sql`SELECT file_url FROM pdfs WHERE id = ${id}`;
      
      if (rows.length === 0) {
        return res.status(404).json({ error: 'PDF not found' });
      }

      const fileUrl = rows[0].file_url;
      const key = fileUrl.split('/').pop();

      const command = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET as string,
        Key: key,
      });

      const { Body } = await s3Client.send(command);
      res.setHeader('Content-Disposition', `attachment; filename="${key}"`);
      res.setHeader('Content-Type', 'application/pdf');
      
      // @ts-ignore
      Body.pipe(res);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}