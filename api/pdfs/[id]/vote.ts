import { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';
import { useParams } from 'react-router-dom';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
        const { id } = useParams<{ id: string }>();
        const { userId, voteType } = req.body;

      await sql`
        INSERT INTO user_votes (user_id, pdf_id, vote_type)
        VALUES (${userId}, ${id}, ${voteType})
        ON CONFLICT (user_id, pdf_id) DO UPDATE SET vote_type = ${voteType}
      `;

      const { rows } = await sql`
        UPDATE pdfs
        SET upvotes = (SELECT COUNT(*) FROM user_votes WHERE pdf_id = ${id} AND vote_type = 'up'),
            downvotes = (SELECT COUNT(*) FROM user_votes WHERE pdf_id = ${id} AND vote_type = 'down')
        WHERE id = ${id}
        RETURNING *
      `;

      res.status(200).json(rows[0]);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}