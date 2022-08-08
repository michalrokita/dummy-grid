import { useEffect, useState } from 'react';

export type AlbumType = {
  id: number;
  title: string;
  userId: number;
};

export const useAlbums = () => {
  const [albums, setAlbums] = useState<AlbumType[]>([]);

  const fetchAlbums = async (): Promise<AlbumType[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/albums');
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    let shouldUpdate = true;

    (async function fetchData() {
      const albums = await fetchAlbums();
      if (shouldUpdate) {
        setAlbums(albums);
      }
    })();

    return () => {
      shouldUpdate = false;
    };
  }, []);

  return albums;
};
