import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '../../testing/mockServer';
import Album from './Album';
import { mockedAlbum1Photos, mockedAlbums, mockedUsers } from '../../testing/mockServer';
import { act } from 'react-dom/test-utils';


const album = mockedAlbums[0];
const emptyAlbum = mockedAlbums[1];
const user = mockedUsers[0];
const photos = mockedAlbum1Photos;

test('album component contains album\'s id', () => {
  render(<Album album={album} user={user} />);
  const albumId = screen.getByText(album.id);
  expect(albumId).toBeInTheDocument();
});

test('album component contains album\'s title', () => {
  render(<Album album={album} user={user} />);
  const title = screen.getByText(album.title);
  expect(title).toBeInTheDocument();
});

test('album component contains album user\'s username and email', () => {
  render(<Album album={album} user={user} />);
  const author = screen.getByText(`${user.username}, ${user.email}`);
  expect(author).toBeInTheDocument();
});

test('album component contains a button with area-label "Open albums\' gallery button"', () => {
  render(<Album album={album} user={user} />);
  const toggleButton = screen.getByRole('button');
  expect(toggleButton).toBeInTheDocument();
  expect(toggleButton.getAttribute('area-label')).toBe('Open albums\' gallery button');
});

test('album component display images after clicking a toggle button', async () => {
  render(<Album album={album} user={user} />);

  const toggleButton = screen.getByRole('button');
  act(() => toggleButton.click());

  await waitFor(() => {
    const displayedPhotos = screen.queryAllByRole('img');
    expect(displayedPhotos.length).toBe(photos.length);

    displayedPhotos.forEach((photo, index) => {
      expect(photo).toHaveAttribute('src', photos[index].thumbnailUrl);
      expect(photo).toHaveAttribute('alt', photos[index].title);
    })
  });
});

test('album component does not display images when a toggle button was not clicked', async () => {
  render(<Album album={album} user={user} />);

  await waitFor(() => {
    expect(screen.getByText('This album is empty!')).toBeInTheDocument();
  });
});

test('album component renders "This album is empty!" if album has no photos', async () => {
  render(<Album album={emptyAlbum} user={user} />);

  const toggleButton = screen.getByRole('button');
  act(() => toggleButton.click());

  await waitFor(() => {
    expect(screen.getByText('This album is empty!')).toBeInTheDocument();
  });
});
