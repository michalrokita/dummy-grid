import React from 'react';
import { render, screen } from '@testing-library/react';
import GalleryImageModal from './GalleryImageModal';

const image = {
    albumId: 2,
    id: 1,
    title: 'title',
    url: 'url',
    thumbnailUrl: 'thumbnailUrl'
};

test('does not render a modal if isVisible prop is false', () => {
  render(<GalleryImageModal isVisible={false} image={image} onClose={() => {}} />);
  expect(screen.queryByRole('dialog')).toBeNull();
});

test('renders a modal if isVisible prop is true', () => {
  render(<GalleryImageModal isVisible={true} image={image} onClose={() => {}} />);
  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

test('renders a modal with image from props', () => {
  render(<GalleryImageModal isVisible={true} image={image} onClose={() => {}} />);
  const imageElement = screen.getByRole('img');
  expect(imageElement).toBeInTheDocument();
  expect(imageElement).toHaveAttribute('src', image.url);
});

test('calls onClose when close button is clicked', () => {
  const onClose = jest.fn();
  render(<GalleryImageModal isVisible={true} image={image} onClose={onClose} />);
  const closeButton = screen.getByRole('button');
  closeButton.click();
  expect(onClose).toHaveBeenCalled();
});

test('calls onClose when escape key is pressed', () => {
  const onClose = jest.fn();
  render(<GalleryImageModal isVisible={true} image={image} onClose={onClose} />);
  const escapeKey = { key: 'Escape' };
  const escapeKeyEvent = new KeyboardEvent('keyup', escapeKey);
  window.dispatchEvent(escapeKeyEvent);
  expect(onClose).toHaveBeenCalled();
});
