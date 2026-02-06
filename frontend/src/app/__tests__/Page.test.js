import React from "react";
import { render, screen } from "@testing-library/react";

// Mocks
jest.mock("@/components/PageTitle", () => ({
  __esModule: true,
  default: (props) => <div data-testid="page-title">{props.title} - {props.description}</div>,
}));

jest.mock("@/components/about", () => ({
  __esModule: true,
  default: () => <div data-testid="about-component">About Component</div>,
}));

import AboutPage from "../page";

describe("AboutPage", () => { 
  test("renders About component", () => {
    render(<AboutPage />);
    const about = screen.getByTestId("about-component");
    expect(about).toBeInTheDocument();
  });

  test("renders trainers-index section", () => {
    render(<AboutPage />);
    const section = screen.getByTestId("trainers-section");
    expect(section).toBeInTheDocument();
  });
});
