// ScrollTopButton.test.js
import { render, screen } from '@testing-library/react';
import ScrollTopButton from '../ScrollTopButton';
import '@testing-library/jest-dom';

describe('ScrollTopButton', () => {
  test('renders the ScrollTopButton component', () => {
    render(<ScrollTopButton />);
    const linkElement = screen.getByRole('link', { name: /scroll to top/i });
    expect(linkElement).toBeInTheDocument();
  });

  test('has the correct href attribute', () => {
    render(<ScrollTopButton />);
    const linkElement = screen.getByRole('link', { name: /scroll to top/i });
    expect(linkElement).toHaveAttribute('href', '#');
  });

  test('contains the icon element', () => {
    render(<ScrollTopButton />);
    // Use querySelector to find the <i> with the specific class
    const iconElement = document.querySelector('.bi-arrow-up-short');
    expect(iconElement).toBeInTheDocument();
  });

  test('has the correct CSS classes', () => {
    render(<ScrollTopButton />);
    const linkElement = screen.getByRole('link', { name: /scroll to top/i });
    expect(linkElement).toHaveClass(
      'scroll-top',
      'd-flex',
      'align-items-center',
      'justify-content-center'
    );
  });
});
