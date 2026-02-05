// WhyUs.test.js
import { render, screen } from '@testing-library/react';
import WhyUs from '../WhyUs';
import '@testing-library/jest-dom';

describe('WhyUs Component', () => {
  test('renders the WhyUs section', () => {
    render(<WhyUs />);
    
    const section = screen.getByTestId('why-us-section');
    expect(section).toBeInTheDocument();
  });

  test('renders the main heading and description', () => {
    render(<WhyUs />);

    const heading = screen.getByRole('heading', { name: /why choose learnease\?/i });
    expect(heading).toBeInTheDocument();

    const description = screen.getByText(/learnease is built to provide accessible/i);
    expect(description).toBeInTheDocument();
  });

  test('renders the "Learn More" link', () => {
    render(<WhyUs />);
    
    const learnMoreLink = screen.getByRole('link', { name: /learn more/i });
    expect(learnMoreLink).toBeInTheDocument();
    expect(learnMoreLink).toHaveAttribute('href', '/about');
  });

  test('renders all feature boxes', () => {
    render(<WhyUs />);

    const features = [
      'Structured Learning Paths',
      'Skill-Focused Content',
      'Assessments & Insights'
    ];

    features.forEach(feature => {
      const featureHeading = screen.getByRole('heading', { name: feature });
      expect(featureHeading).toBeInTheDocument();
    });
  });
});
