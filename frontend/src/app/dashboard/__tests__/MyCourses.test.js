import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "../my-courses/page";

// Mock the child component (NOT the page)
// eslint-disable-next-line react/display-name
jest.mock("../../../components/dashboard/MyCourses.js", () => () => (
  <div data-testid="my-courses-component">
    Mocked MyCourses Component
  </div>
));

describe("My Courses Page", () => {

  test("renders without crashing", () => {
    render(<Page />);
  });

  test("renders MyCourses component", () => {
    render(<Page />);

    expect(
      screen.getByTestId("my-courses-component")
    ).toBeInTheDocument();
  });

});
