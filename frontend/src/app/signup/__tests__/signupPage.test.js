import { render, screen } from "@testing-library/react";
import SignupPage from "../page";

// Mock Signup component
jest.mock("@/components/auth/Signup", () => ({
  __esModule: true,
  default: () => <div data-testid="signup-component">Signup Component</div>,
}));

describe("SignupPage", () => {
  test("renders Signup component", () => {
    render(<SignupPage />);

    expect(screen.getByTestId("signup-component")).toBeInTheDocument();
    expect(screen.getByText("Signup Component")).toBeInTheDocument();
  });
});
