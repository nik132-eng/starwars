import React, { useEffect, useState } from 'react';
import './Landing.scss'; 
import Lightsaber from './Lightsaber';

const Landing: React.FC = () => {
  const [films, setFilms] = useState<any[]>([]);
  const [currentFilmIndex, setCurrentFilmIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  
  const fetchFilms = async () => {
    try {
      const responses = await Promise.all(
        Array.from({ length: 6 }, (_, index) =>
          fetch(`https://swapi.dev/api/films/${index + 1}/`)
        )
      );

      const data = await Promise.all(responses.map(res => res.json()));
      setFilms(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching films:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilms(); 

    const interval = setInterval(() => {
      setCurrentFilmIndex((prevIndex) => (prevIndex + 1) % films.length);
    }, 10000); 

    return () => clearInterval(interval); 
  }, [films.length]); 

  if (loading) {
    return <p className='loading'>Loading...</p>;
  }

  const currentFilm = films[currentFilmIndex] || {};
  const { title, director, producer, release_date, opening_crawl } = currentFilm;

  return (
    <section className="star-wars">
      <div className="crawl">
        <div className="title">
          <p>Episode {currentFilm.episode_id || ""}</p>
          <h1>{title || ""}</h1>
        </div>
        <p><strong>Director:</strong> {director || ""}</p>
        <p><strong>Producer:</strong> {producer || ""}</p>
        <p><strong>Release Date:</strong> {release_date || ""}</p>
        <div className="opening-crawl">
          {opening_crawl.split('\n').map((line: string, index: number) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
      <div className="fade"></div>
	   {/* Lightsaber at the bottom left */}
	   <div className="lightsaber-wrapper">
        <Lightsaber />
      </div>
    </section>
  );
};

export default Landing;
