import React from "react";
import { render, screen } from "@testing-library/react"; 
import ForgotPasswordPage from "../page";

/* -------- Mock Component -------- */
jest.mock("@/components/auth/ForgotPassword", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="forgot-password-component">
      Forgot Password Component
    </div>
  ),
}));

/* -------- Tests -------- */

describe("ForgotPasswordPage", () => {
  test("renders ForgotPassword component", () => {
    render(<ForgotPasswordPage />);

    const component = screen.getByTestId("forgot-password-component");
    expect(component).toBeInTheDocument();
    expect(component).toHaveTextContent("Forgot Password Component");
  });

  test("renders only one ForgotPassword component", () => {
    render(<ForgotPasswordPage />);

    const components = screen.getAllByTestId("forgot-password-component");
    expect(components).toHaveLength(1);
  });
});
