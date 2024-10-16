import React, { useState } from 'react';
import { Button } from '@mantine/core';
import DataDashboard from '../components/DataDashboard';

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('vehicles');

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        {['people', 'films', 'starships', 'vehicles', 'species', 'planets'].map(category => (
          <Button key={category} onClick={() => setSelectedCategory(category)}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>
      <DataDashboard category={selectedCategory} />
    </div>
  );
};

export default Dashboard;
