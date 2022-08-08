import { useCallback, useEffect, useState } from 'react';

export type AlbumImage = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export const useAlbumsImages = (
  albumId: number,
  shouldFetch: boolean,
  max: number = 12
): [AlbumImage[], boolean] => {
  const [albumsImages, setAlbumsImages] = useState<AlbumImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAlbumsImages = useCallback(async (): Promise<AlbumImage[]> => {
    setIsLoading(true);
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
    );
    const data = await response.json();
    setIsLoading(false);
    return data.slice(0, max);
  }, [albumId, max]);

  useEffect(() => {
    if (!shouldFetch) {
      return;
    }

    let shouldUpdate = true;

    (async function fetchData() {
      const albums = await fetchAlbumsImages();
      if (shouldUpdate) {
        setAlbumsImages(albums);
      }
    })();

    return () => {
      shouldUpdate = false;
    };
  }, [fetchAlbumsImages, shouldFetch]);

  return [albumsImages, isLoading];
};
