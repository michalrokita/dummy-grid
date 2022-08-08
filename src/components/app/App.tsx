import React from 'react';
import { useAlbums } from '../../hooks/useAlbums.hook';
import './App.css';
import Album from '../album/Album';
import { useUsers } from '../../hooks/useUsers.hook';

function App() {
  const albums = useAlbums();
  const users = useUsers();

  const getUser = (userId: number) => users.find((user) => user.id === userId);

  return (
    <div className="container mx-auto py-12 px-8 scroll-smooth">
      <div className="relative">
        <h1 className="text-4xl font-black headline mb-10">Albums Explorer</h1>
      </div>
      <div className="flex flex-col gap-5">
        {albums.map((album) => {
          return (
            <Album key={album.id} album={album} user={getUser(album.userId)} />
          );
        })}
      </div>

      <a
        href="https://www.flaticon.com/free-icons/arrow"
        title="arrow icons"
        className="text-center text-gray-500 mt-10 block"
      >
        Arrow icons created by th studio - Flaticon
      </a>
    </div>
  );
}

export default App;
