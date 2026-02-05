import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import About from "../about";


// 🧠 Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />;
  },
}));

// 🧠 Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...rest }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));


describe("About component", () => {

  test("renders section with heading", () => {
    render(<About />);

    expect(
      screen.getByRole("heading", {
        name: /Empowering Learning Through Technology/i,
      })
    ).toBeInTheDocument();
  });


  test("renders description text", () => {
    render(<About />);

    expect(
      screen.getByText(
        /LearnEase is designed to simplify online education/i
      )
    ).toBeInTheDocument();
  });


  test("renders all feature list items", () => {
    render(<About />);

    expect(
      screen.getByText(/User-friendly platform for accessing courses/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Structured learning paths with assessments/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Secure authentication, progress tracking/i)
    ).toBeInTheDocument();
  });


  test("renders image with correct attributes", () => {
    render(<About />);

    const img = screen.getByAltText("About LearnEase");

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/images/about.jpg");
    expect(img).toHaveAttribute("width", "600");
    expect(img).toHaveAttribute("height", "450");
  });


  test("renders read more link", () => {
    render(<About />);

    const link = screen.getByRole("link", { name: /Read More/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/about");
  });

});
