import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

// Define a type for the PDF object
interface PDF {
  id: string; // Adjust the type based on your API response
  title: string;
  file_url: string; // URL to access the PDF
}

const PDFManager: React.FC = () => {
  const [pdfs, setPdfs] = useState<PDF[]>([]); // Use the PDF type here
  const [title, setTitle] = useState<string>('');
  const [file, setFile] = useState<File | null>(null); // Specify File type or null
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    fetchPDFs();
  }, []);

  const fetchPDFs = async () => {
    try {
      const response = await fetch('src/server/api/pdfs');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: PDF[] = await response.json(); // Specify the expected type
      setPdfs(data);
    } catch (err) {
      setError('Failed to fetch PDFs. Please try again later.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]; // Optional chaining
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please select a valid PDF file');
      setFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!file || !title) {
      setError('Please provide both a title and a PDF file');
      setLoading(false);
      return;
    }

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64File = reader.result?.toString().split(',')[1]; // Ensure result is not null
        
        if (!base64File) {
          throw new Error('Failed to read file as base64.');
        }

        const response = await fetch('src/server/api/pdfs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            file: {
              name: file.name,
              type: file.type,
              data: base64File,
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        await response.json(); // Await the response
        setSuccess(true);
        setTitle('');
        setFile(null);
        fetchPDFs();
      };
      
      reader.onerror = () => {
        setError('Failed to read the file. Please try again.');
        setLoading(false);
      };
      
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // Set error message from caught error
      } else {
        setError('Failed to upload PDF. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Upload PDF</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Enter PDF title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-2"
              />
              <Input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={loading || !file || !title}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : 'Upload PDF'}
            </Button>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mt-4">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>PDF uploaded successfully!</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded PDFs</CardTitle>
        </CardHeader>
        <CardContent>
          {pdfs.length > 0 ? (
            <div className="space-y-2">
              {pdfs.map((pdf) => (
                <div 
                  key={pdf.id} 
                  className="flex justify-between items-center p-2 border rounded hover:bg-gray-50"
                >
                  <span>{pdf.title}</span>
                  <a 
                    href={pdf.file_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View PDF
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No PDFs uploaded yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PDFManager;