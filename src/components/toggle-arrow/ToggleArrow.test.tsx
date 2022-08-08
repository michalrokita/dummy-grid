import React from 'react';
import { render, screen } from '@testing-library/react';
import ToggleArrow from './ToggleArrow';

test('renders a button', () => {
  render(<ToggleArrow onClick={() => {}} toggle={false} />);
  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
});

test('rendered button calls onClick from props when clicked on', () => {
  const onClick = jest.fn();
  render(<ToggleArrow onClick={onClick} toggle={false} />);
  const button = screen.getByRole('button');
  button.click();
  expect(onClick).toHaveBeenCalled();
})

test('rendered button has className from props', () => {
  render(<ToggleArrow onClick={() => {}} toggle={false} className="test-class" />);
  const button = screen.getByRole('button');
  expect(button).toHaveClass('test-class');
});

test('rendered button\'s svg arrow has -rotate-180 class when toggle is true', () => {
  render(<ToggleArrow onClick={() => {}} toggle={true} />);
  const button = screen.getByRole('button');
  // eslint-disable-next-line testing-library/no-node-access
  const svg = button.firstChild;

  expect(svg).toHaveClass('-rotate-180');
});

test('rendered button\'s svg arrow does not have -rotate-180 class when toggle is false', () => {
  render(<ToggleArrow onClick={() => {}} toggle={false} />);
  const button = screen.getByRole('button');
  // eslint-disable-next-line testing-library/no-node-access
  const svg = button.firstChild;

  expect(svg).not.toHaveClass('-rotate-180');
});
