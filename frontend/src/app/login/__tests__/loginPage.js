import React from "react";
import { render, screen } from "@testing-library/react"; 
import LoginPage from "../page";

/* -------- Mock Login Component -------- */
jest.mock("@/components/auth/Login", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="login-component">
      Login Component
    </div>
  ),
}));

/* -------- Tests -------- */

describe("LoginPage", () => {
  test("renders Login component", () => {
    render(<LoginPage />);

    const component = screen.getByTestId("login-component");
    expect(component).toBeInTheDocument();
    expect(component).toHaveTextContent("Login Component");
  });

  test("renders only one Login component", () => {
    render(<LoginPage />);

    const components = screen.getAllByTestId("login-component");
    expect(components).toHaveLength(1);
  });
});
