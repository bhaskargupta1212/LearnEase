import { render, screen } from "@testing-library/react";
import Footer from "../footer";

// ✅ Mock next/link properly
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, className }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("Footer Component", () => {
  test("renders brand name", () => {
    render(<Footer />);
    expect(screen.getAllByText("LearnEase").length).toBeGreaterThan(0);
  });

  test("renders brand contact details", () => {
    render(<Footer />);

    expect(
      screen.getByText("123 Innovation Drive")
    ).toBeInTheDocument();

    expect(
      screen.getByText("San Francisco, CA 94107")
    ).toBeInTheDocument();

    expect(
      screen.getByText("+1 (415) 987-6543")
    ).toBeInTheDocument();

    expect(
      screen.getByText("support@learnease.com")
    ).toBeInTheDocument();
  });

  test("renders quick links", () => {
    render(<Footer />);

    const links = ["Home", "About Us", "Courses", "Contact", "Privacy Policy"];

    links.forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test("renders services links", () => {
    render(<Footer />);

    const services = [
      "Web Development",
      "UI/UX Design",
      "Digital Marketing",
      "Content Strategy",
      "Tech Consulting",
    ];

    services.forEach(service => {
      expect(screen.getByText(service)).toBeInTheDocument();
    });
  });

  test("renders newsletter section", () => {
    render(<Footer />);

    expect(
      screen.getByText("Join Our Newsletter")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter your email address")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Subscribe")
    ).toBeInTheDocument();
  });

  test("renders copyright with current year", () => {
    render(<Footer />);

    const year = new Date().getFullYear().toString();
    expect(screen.getByText(year, { exact: false })).toBeInTheDocument();
  });
  
});
