import React, { useEffect, useState } from 'react';
import './Landing.scss'; 

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

  // Add neon cursor effect
  useEffect(() => {
    const loadNeonCursor = async () => {
      try {
        const neonCursorModule: any = await import('https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js');
        const neonCursor = neonCursorModule.neonCursor;

        neonCursor({
          el: document.getElementById('app'), // Make sure 'app' is the correct ID
          shaderPoints: 16,
          curvePoints: 80,
          curveLerp: 0.5,
          radius1: 5,
          radius2: 30,
          velocityTreshold: 10,
          sleepRadiusX: 100,
          sleepRadiusY: 100,
          sleepTimeCoefX: 0.0025,
          sleepTimeCoefY: 0.0025,
        });
      } catch (error) {
        console.error('Error loading neon cursor:', error);
      }
    };

    loadNeonCursor();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
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
    </section>
  );
};

export default Landing;
