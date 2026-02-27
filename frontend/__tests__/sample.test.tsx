import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Frontend Check', () => {
  it('renders a heading', () => {
    render(<h1>Hola Mundo</h1>);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
