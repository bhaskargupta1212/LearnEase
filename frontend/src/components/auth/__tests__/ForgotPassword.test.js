import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ForgotPassword from "../ForgotPassword";
import "@testing-library/jest-dom";

// mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));


describe("ForgotPassword component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  it("renders forgot password form", () => {
    render(<ForgotPassword />);

    expect(screen.getByText("Forgot Password")).toBeInTheDocument();
    expect(
      screen.getByText("Enter your email to receive a password reset link")
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Send Reset Link" })
    ).toBeInTheDocument();

    expect(screen.getByText("Back to Login")).toBeInTheDocument();
  });

  it("updates email input value", () => {
    render(<ForgotPassword />);

    const emailInput = screen.getByLabelText("Email address");

    fireEvent.change(emailInput, {
      target: { value: "test@example.com" },
    });

    expect(emailInput.value).toBe("test@example.com");
  });

  it("submits form and shows success message", async () => {
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        message: "Reset link sent successfully",
      }),
    });

    render(<ForgotPassword />);

    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "test@example.com" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Send Reset Link" })
    );

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/auth/forgot-password"),
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@example.com" }),
      })
    );

    expect(
      await screen.findByText("Reset link sent successfully")
    ).toBeInTheDocument();
  });

  it("clears message after 10 seconds", async () => {
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        message: "Reset link sent successfully",
      }),
    });

    render(<ForgotPassword />);

    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "test@example.com" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "Send Reset Link" })
    );

    expect(
      await screen.findByText("Reset link sent successfully")
    ).toBeInTheDocument();

    // advance timer by 10 seconds
    jest.advanceTimersByTime(10000);

    await waitFor(() => {
      expect(
        screen.queryByText("Reset link sent successfully")
      ).not.toBeInTheDocument();
    });
  });
});
