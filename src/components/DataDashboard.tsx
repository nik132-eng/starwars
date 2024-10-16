import React, { useState, useEffect } from 'react';
import { Card, CardSection, Title, Text, Select, Input } from '@mantine/core';
import './DataDashboard.scss'

interface Item {
  name: string;
  model?: string; // Optional, for starships
  vehicle_class?: string; // Optional, for vehicles
  // Add other properties as needed for different categories
}

interface DataDashboardProps {
  category: string;
}

const DataDashboard: React.FC<DataDashboardProps> = ({ category }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/${category}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setItems(data.results);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };

    fetchItems();
  }, [category]);

  const sortedItems = items
  .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  .sort((a, b) => {
    const aValue = a[sortBy as keyof Item];
    const bValue = b[sortBy as keyof Item];

    // Handle undefined cases by comparing defined values or fallback to empty string
    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return 1; // Move undefined items to the end
    if (bValue === undefined) return -1; // Move undefined items to the end

    if (aValue < bValue) return -1;
    if (aValue > bValue) return 1;
    return 0;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <Title order={1} className="text-2xl font-bold mb-4">{`${category.charAt(0).toUpperCase() + category.slice(1)} Dashboard`}</Title>

      <div className="mb-4 flex space-x-4">
        <Input
          type="text"
          placeholder={`Search by name`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '33%' }}
        />

        <Select
          value={sortBy}
          onChange={(value) => setSortBy(value as string)}
          placeholder="Sort by"
          style={{ width: '24%' }}
          data={[
            { value: 'name', label: 'Name' },
            { value: 'model', label: 'Model' },
            { value: 'vehicle_class', label: 'Class' },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedItems.map((item) => (
          <Card key={item.name} shadow="sm" padding="lg">
            <CardSection>
              <Title order={3}>{item.name}</Title>
            </CardSection>
            <CardSection>
              <Text><strong>Model:</strong> {item.model || 'N/A'}</Text>
              <Text><strong>Class:</strong> {item.vehicle_class || 'N/A'}</Text>
            </CardSection>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DataDashboard;
