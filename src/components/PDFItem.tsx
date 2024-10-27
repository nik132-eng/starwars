import { useState } from 'react';
import useStore, { PDF } from '../store/authStore';
import { Document, Page } from 'react-pdf';

interface PDFItemProps {
  pdf: PDF; 
}

export default function PDFItem({ pdf }: PDFItemProps) {
  const { votePDF, addComment } = useStore();
  const [comment, setComment] = useState('');

  const handleVote = (voteType: 'up' | 'down') => {
    votePDF(pdf.id, 'user123', voteType); // TODO: Replace 'user123' with actual user ID
  };

  const handleComment = () => {
    addComment(pdf.id, 'user123', comment); // TODO: Replace 'user123' with actual user ID
    setComment('');
  };

  return (
    <div className="border p-4 rounded">
      <h2 className="text-xl font-bold">{pdf.title}</h2>
      <Document file={pdf.fileUrl}>
        <Page pageNumber={1} width={200} />
      </Document>
      <div className="flex gap-2 mt-2">
        <button onClick={() => handleVote('up')} className="bg-green-500 text-white px-2 py-1 rounded">
          Upvote ({pdf.upvotes})
        </button>
        <button onClick={() => handleVote('down')} className="bg-red-500 text-white px-2 py-1 rounded">
          Downvote ({pdf.downvotes})
        </button>
        <a href={`http://localhost:5000/api/pdfs/${pdf.id}/download`} className="bg-blue-500 text-white px-2 py-1 rounded">
          Download
        </a>
      </div>
      <div className="mt-4">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Add a comment..."
        />
        <button onClick={handleComment} className="mt-2 bg-purple-500 text-white px-2 py-1 rounded">
          Add Comment
        </button>
      </div>
    </div>
  );
}