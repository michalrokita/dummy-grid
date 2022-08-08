import React from 'react';
import { render, screen } from '@testing-library/react';
import '../../testing/mockServer';
import App from './App';
import { mockedAlbums } from '../../testing/mockServer';

test('renders "Albums Explorer" header', () => {
  render(<App />);
  const header = screen.getByText(/Albums Explorer/i);
  expect(header).toBeInTheDocument();
});

test('fetches albums from the API and displays them', async () => {
  render(<App />);
  const album1 = await screen.findByText(mockedAlbums[0].title);
  const album2 = await screen.findByText(mockedAlbums[1].title);

  expect(album1).toBeInTheDocument();
  expect(album2).toBeInTheDocument();
});
