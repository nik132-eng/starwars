import { useParams } from 'react-router-dom';
import { useResourceDetail } from '../hooks/useResourceDetail';
import { Loader, Card, Text, List } from '@mantine/core';

interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  vehicles: string[];
  starships: string[];
}

const ResourceDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useResourceDetail<Person>(`${import.meta.env.VITE_SWAPI_BASE_URL}/people/${id}`);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !data) {
    return <Text>Error loading resource</Text>;
  }

  return (
    <Card>
      {/* Basic Info */}
      <Text>Name: {data.name}</Text>
      <Text>Height: {data.height} cm</Text>
      <Text>Mass: {data.mass} kg</Text>
      <Text>Hair Color: {data.hair_color}</Text>
      <Text>Eye Color: {data.eye_color}</Text>
      <Text>Birth Year: {data.birth_year}</Text>
      <Text>Gender: {data.gender}</Text>

      {/* You can enrich and fetch other related resources like homeworld, films, etc., separately */}
      <Text mt="md" weight={700}>Homeworld URL: {data.homeworld}</Text>

      {/* Films */}
      <Text mt="md" weight={700}>Films:</Text>
      <List>
        {data.films.length > 0 ? (
          data.films.map((filmUrl) => <List.Item key={filmUrl}>{filmUrl}</List.Item>)
        ) : (
          <Text>No films available.</Text>
        )}
      </List>

      {/* Vehicles */}
      <Text mt="md" weight={700}>Vehicles:</Text>
      <List>
        {data.vehicles.length > 0 ? (
          data.vehicles.map((vehicleUrl) => <List.Item key={vehicleUrl}>{vehicleUrl}</List.Item>)
        ) : (
          <Text>No vehicles available.</Text>
        )}
      </List>

      {/* Starships */}
      <Text mt="md" weight={700}>Starships:</Text>
      <List>
        {data.starships.length > 0 ? (
          data.starships.map((starshipUrl) => <List.Item key={starshipUrl}>{starshipUrl}</List.Item>)
        ) : (
          <Text>No starships available.</Text>
        )}
      </List>
    </Card>
  );
};

export default ResourceDetailPage;
