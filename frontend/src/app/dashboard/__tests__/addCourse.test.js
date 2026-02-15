import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "../add-course/page";

// eslint-disable-next-line react/display-name
jest.mock("../../../components/AddCourseFrom.js", () => () => (
  <div data-testid="add-course-form">Mocked AddCourseForm</div>
));

describe("Add Course Page", () => {

  test("renders AddCourseForm component", () => {
    render(<Page />);

    expect(
      screen.getByTestId("add-course-form")
    ).toBeInTheDocument();
  });

});
