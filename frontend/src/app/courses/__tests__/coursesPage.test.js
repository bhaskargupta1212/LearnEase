import React from "react";
import { render, screen } from "@testing-library/react"; 
import CoursesPage from "../page";

/* ---------------- MOCKS ---------------- */

jest.mock("@/components/PageTitle", () => ({
  __esModule: true,
  default: (props) => (
    <div data-testid="page-title">
      {props.title} - {props.description}
    </div>
  ),
}));

jest.mock("@/components/courses", () => ({
  __esModule: true,
  default: () => <div data-testid="courses-component">Courses Component</div>,
}));

/* ---------------- TESTS ---------------- */

describe("CoursesPage", () => {
  test("renders PageTitle with correct content", () => {
    render(<CoursesPage />);

    const title = screen.getByTestId("page-title");

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Our Courses");
    expect(title).toHaveTextContent(
      "Explore expertly crafted courses designed to help you build in-demand skills and advance your career."
    );
  });

  test("renders Courses component", () => {
    render(<CoursesPage />);
    expect(screen.getByTestId("courses-component")).toBeInTheDocument();
  });

  test("renders section wrapper with trainers-index class", () => {
    render(<CoursesPage />);
    const section = document.querySelector(".trainers-index");
    expect(section).toBeInTheDocument();
  });

  test("contains container and row layout", () => {
    render(<CoursesPage />);
    expect(document.querySelector(".container")).toBeInTheDocument();
    expect(document.querySelector(".row")).toBeInTheDocument();
  });
});
