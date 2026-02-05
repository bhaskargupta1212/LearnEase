import { render, screen } from "@testing-library/react";
import Hero from "../hero";

/* Mock next/link */
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, className }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

/* Mock next/image */
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />;
  },
}));

describe("Hero Component", () => {
  test("renders hero heading text", () => {
    render(<Hero />);

    expect(
      screen.getByText(/Learning Today,/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Empowering Tomorrow/i)
    ).toBeInTheDocument();
  });

  test("renders hero description", () => {
    render(<Hero />);

    expect(
      screen.getByText(/modern e-learning platform/i)
    ).toBeInTheDocument();
  });

  test("renders background image with alt text", () => {
    render(<Hero />);

    const image = screen.getByAltText(
      "LearnEase Online Learning Platform"
    );

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/images/hero-bg.jpg");
  });

  test("renders Get Started link pointing to courses page", () => {
    render(<Hero />);

    const link = screen.getByRole("link", { name: /get started/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/courses");
  });
});
