import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  const element = screen.getByText(/public github repositories/i);
  expect(element).toBeInTheDocument();
});
