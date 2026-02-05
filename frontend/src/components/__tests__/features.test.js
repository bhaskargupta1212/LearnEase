import { render, screen } from "@testing-library/react";
import Features from "../features";

// Proper Next.js Link mock
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, className }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("Features Component", () => {
  test("renders Features section", () => {
    render(<Features />); 
  });

  test("renders all feature titles", () => {
    render(<Features />);

    const titles = [
      "Smart Learning Dashboard",
      "Unlimited Course Access",
      "Certified Skill Programs",
      "Custom Learning Paths",
      "Flexible Course Navigation",
      "Performance-Based Ratings",
      "High-Quality Learning Content",
      "Video-Based Lessons",
      "Interactive Assessments",
      "Modern UI Experience",
      "Real-Time Progress Tracking",
      "Continuous Learning Support",
    ];

    titles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  test("all features link to /features", () => {
    render(<Features />);

    const links = screen.getAllByRole("link");

    links.forEach(link => {
      expect(link).toHaveAttribute("href", "/features");
    });
  });
});
