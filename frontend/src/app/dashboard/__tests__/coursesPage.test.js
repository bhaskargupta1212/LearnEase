// page.test.js
import { render, screen } from "@testing-library/react";
import Page from "../courses/page";

// Mock the Courses component
jest.mock("@/components/courses", () => {
  return function MockCourses() {
    return <div data-testid="courses-component">Courses Component</div>;
  };
});

describe("Dashboard Courses Page", () => {
  test("renders the Courses component", () => {
    render(<Page />);
    const courses = screen.getByTestId("courses-component");
    expect(courses).toBeInTheDocument();
    expect(courses).toHaveTextContent("Courses Component");
  });
});
