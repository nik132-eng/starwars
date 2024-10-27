import { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';
import { useParams } from 'react-router-dom';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const { id } = useParams<{ id: string }>();
      const { rows } = await sql`
        SELECT * FROM comments
        WHERE pdf_id = ${id}
        ORDER BY created_at DESC
      `;
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else if (req.method === 'POST') {
    try {
        const { id } = useParams<{ id: string }>();
        const { userId, content } = req.body;
      const { rows } = await sql`
        INSERT INTO comments (pdf_id, user_id, content)
        VALUES (${id}, ${userId}, ${content})
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