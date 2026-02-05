import React from "react";
import { render, screen } from "@testing-library/react";
import Courses from "../courses";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }) =>
    React.createElement("a", { href }, children),
}));


describe("Courses Component", () => {

  test("renders courses section title", () => {
    render(<Courses />);

    expect(screen.getByText("Courses")).toBeInTheDocument();
    expect(screen.getByText("Popular Courses")).toBeInTheDocument();
  });

  test("renders all course titles", () => {
    render(<Courses />);

    expect(screen.getByText("Full Stack Web Development")).toBeInTheDocument();
    expect(screen.getByText("SEO & Digital Marketing")).toBeInTheDocument();
    expect(screen.getByText("Professional Copywriting")).toBeInTheDocument();
  });

  test("renders categories and prices", () => {
    render(<Courses />);

    expect(screen.getByText("Web Development")).toBeInTheDocument();
    expect(screen.getByText("Digital Marketing")).toBeInTheDocument();
    expect(screen.getByText("Content Writing")).toBeInTheDocument();

    expect(screen.getByText("₹1,999")).toBeInTheDocument();
    expect(screen.getByText("₹2,499")).toBeInTheDocument();
    expect(screen.getByText("₹1,799")).toBeInTheDocument();
  });

  test("renders trainer names", () => {
    render(<Courses />);

    expect(screen.getByText("Antonio")).toBeInTheDocument();
    expect(screen.getByText("Lana")).toBeInTheDocument();
    expect(screen.getByText("Brandon")).toBeInTheDocument();
  });

  test("renders course images", () => {
    render(<Courses />);

    expect(screen.getByAltText("Full Stack Web Development")).toBeInTheDocument();
    expect(screen.getByAltText("SEO & Digital Marketing")).toBeInTheDocument();
    expect(screen.getByAltText("Professional Copywriting")).toBeInTheDocument();
  });

  test("course links point to details page", () => {
    render(<Courses />);

    const links = screen.getAllByRole("link");
    links.forEach(link => {
      expect(link).toHaveAttribute("href", "/courses/details");
    });
  });

  test("renders correct number of courses", () => {
    render(<Courses />);

    const titles = screen.getAllByRole("link");
    expect(titles.length).toBe(3);
  });

});
