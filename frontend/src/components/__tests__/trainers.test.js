import { render, screen } from '@testing-library/react';
import Trainers from '../trainers';
import '@testing-library/jest-dom';

describe('Trainers Component', () => {
  test('renders the Trainers section', () => {
    render(<Trainers />);
    
    const section = screen.getByTestId('trainers-section');
    expect(section).toBeInTheDocument();
  });

  test('renders all TrainerCard components', () => {
    render(<Trainers />);
    
    expect(screen.getByText('Walter White')).toBeInTheDocument();
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
    expect(screen.getByText('William Anderson')).toBeInTheDocument();
  });

  test('each TrainerCard has an image with correct alt text', () => {
    render(<Trainers />);
    
    expect(screen.getByAltText('Walter White')).toBeInTheDocument();
    expect(screen.getByAltText('Sarah Johnson')).toBeInTheDocument();
    expect(screen.getByAltText('William Anderson')).toBeInTheDocument();
  });
});
