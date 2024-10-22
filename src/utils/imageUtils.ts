export const getImageUrl = (category: string, itemUrl: string) => {
    const id = itemUrl.match(/\/([0-9]+)\/$/)?.[1];
    if (!id) return '';
  
    switch (category) {
      case 'people':
        return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
      case 'films':
        return `https://starwars-visualguide.com/assets/img/films/${id}.jpg`;
      case 'starships':
        return `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
      case 'vehicles':
        return `https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`;
      case 'species':
        return `https://starwars-visualguide.com/assets/img/species/${id}.jpg`;
      case 'planets':
        return `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;
      default:
        return '';
    }
  };
  