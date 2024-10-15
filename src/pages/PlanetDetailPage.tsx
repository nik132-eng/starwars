import { useParams } from "react-router-dom";
import { useResourceDetail } from "../hooks/useResourceDetail";
import { Loader } from "@mantine/core/lib/Loader";
import { Card } from "@mantine/core";

interface Planet {
    name: string;
    climate: string;
    terrain: string;
    population: string;
  }
  
  export const PlanetDetailPage = () => {
    const { id } = useParams();
    const { data, isLoading, error } = useResourceDetail<Planet>(`https://swapi.dev/api/planets/${id}`);
  
    if (isLoading) {
      return <Loader />;
    }
  
    if (error || !data) {
      return <p>Error loading planet</p>;
    }
  
    return (
      <Card>
        <p>Name: {data.name}</p>
        <p>Climate: {data.climate}</p>
        <p>Terrain: {data.terrain}</p>
        <p>Population: {data.population}</p>
      </Card>
    );
  };
  