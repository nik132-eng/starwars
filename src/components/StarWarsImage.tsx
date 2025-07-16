import { useState } from 'react';
import { FALLBACK_IMAGES } from '../utils/fallbackImages';

interface StarWarsImageProps {
  category: string;
  imageUrl: string;
  alt: string;
  className?: string;
}

export const StarWarsImage = ({ category, imageUrl, alt, className = '' }: StarWarsImageProps) => {
  const [error, setError] = useState(false);

  const fallbackImage = FALLBACK_IMAGES[category as keyof typeof FALLBACK_IMAGES] || FALLBACK_IMAGES.default;

  return (
    <img
      src={error ? fallbackImage : imageUrl}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
};
