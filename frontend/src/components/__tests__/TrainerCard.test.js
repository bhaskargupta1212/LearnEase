// TrainerCard.test.js
import { render, screen } from '@testing-library/react';
import TrainerCard from '../TrainerCard';
import '@testing-library/jest-dom';

describe('TrainerCard', () => {
  const mockProps = {
    image: 'https://example.com/trainer.jpg',
    name: 'John Doe',
    role: 'Fitness Trainer',
    description: 'John is an expert in strength training.',
    socials: {
      twitter: 'https://twitter.com/johndoe',
      facebook: 'https://facebook.com/johndoe',
      instagram: 'https://instagram.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe'
    },
    index: 2
  };

  test('renders correctly with all props', () => {
    render(<TrainerCard {...mockProps} />);

    // Image
    const img = screen.getByAltText(mockProps.name);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockProps.image);

    // Name
    expect(screen.getByText(mockProps.name)).toBeInTheDocument();

    // Role
    expect(screen.getByText(mockProps.role)).toBeInTheDocument();

    // Description
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();

    // Social links
    expect(screen.getByRole('link', { name: /twitter/i })).toHaveAttribute('href', mockProps.socials.twitter);
    expect(screen.getByRole('link', { name: /facebook/i })).toHaveAttribute('href', mockProps.socials.facebook);
    expect(screen.getByRole('link', { name: /instagram/i })).toHaveAttribute('href', mockProps.socials.instagram);
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', mockProps.socials.linkedin);

    // data-aos-delay
    const container = screen.getByText(mockProps.name).closest('[data-aos-delay]');
    expect(container).toHaveAttribute('data-aos-delay', String(mockProps.index * 100));
  });

  test('renders only provided social links', () => {
    const partialSocials = { twitter: 'https://twitter.com/johndoe' };
    render(<TrainerCard {...mockProps} socials={partialSocials} />);

    // Twitter link exists
    const twitterLink = screen.getByRole('link', { name: /twitter/i });
    expect(twitterLink).toBeInTheDocument();

    // Other social links do not exist
    expect(screen.queryByRole('link', { name: /facebook/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /instagram/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /linkedin/i })).not.toBeInTheDocument();
  });
});
