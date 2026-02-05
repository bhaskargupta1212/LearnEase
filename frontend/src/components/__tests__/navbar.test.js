import { render, screen } from "@testing-library/react";
import Navbar from "../navbar";

/* Mock next/link */
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, className }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

/* Mock usePathname */
const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

describe("Navbar Component", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
  });

  test("renders brand name", () => {
    render(<Navbar />);

    expect(
      screen.getByRole("heading", { name: "LearnEase" })
    ).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    render(<Navbar />);

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Courses" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Trainers" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  });

  test("renders Login / Signup CTA", () => {
    render(<Navbar />);

    const cta = screen.getByRole("link", { name: /login \/ signup/i });

    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "/login");
  });

  test("applies active class to Home link when pathname is '/'", () => {
    mockUsePathname.mockReturnValue("/");

    render(<Navbar />);

    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toHaveClass("active");
  });

  test("applies active class to Courses link when pathname is '/courses'", () => {
    mockUsePathname.mockReturnValue("/courses");

    render(<Navbar />);

    const coursesLink = screen.getByRole("link", { name: "Courses" });
    expect(coursesLink).toHaveClass("active");
  });

  test("does not apply active class to inactive links", () => {
    mockUsePathname.mockReturnValue("/about");

    render(<Navbar />);

    const homeLink = screen.getByRole("link", { name: "Home" });
    const aboutLink = screen.getByRole("link", { name: "About" });

    expect(aboutLink).toHaveClass("active");
    expect(homeLink).not.toHaveClass("active");
  });
});
