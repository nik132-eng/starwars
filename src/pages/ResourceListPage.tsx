import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

interface Resource {
  name: string;
  url: string;
}

const fetchResources = async (): Promise<Resource[]> => {
  const res = await fetch(`${import.meta.env.VITE_SWAPI_BASE_URL}/people`);
  if (!res.ok) throw new Error('Failed to fetch resources');
  return res.json().then((data) => data.results);
};

export const ResourceListPage: React.FC = () => {
  const { data: resources, error, isLoading } = useQuery({
    queryKey: ['resources'],
    queryFn: fetchResources,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Resources</h1>
      <ul>
        {resources?.map((resource, index) => (
          <li key={index}>
            <Link to={`/resource/${index + 1}`}>{resource.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceListPage;