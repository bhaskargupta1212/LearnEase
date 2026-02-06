import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ResetPassword from "../page";

// -------------------
// Next.js router mock
// -------------------
const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  useParams: () => ({ token: "abc123" }),
}));

// -------------------
// AuthLayout mock
// prevents duplicate text issues
// -------------------
jest.mock("@/components/auth/AuthLayout", () => ({
  __esModule: true,
  default: ({ title, children }) => (
    <div data-testid="auth-layout">
      <h1 data-testid="auth-title">{title}</h1>
      {children}
    </div>
  ),
}));

// -------------------
beforeEach(() => {
  jest.clearAllMocks();
  global.fetch = jest.fn();
});

// =====================================================
// TESTS
// =====================================================

describe("ResetPassword Page", () => {
  // -------------------
  // Render
  // -------------------
  test("renders form fields", () => {
    render(<ResetPassword />);

    expect(screen.getByTestId("auth-title")).toHaveTextContent(
      "Reset Password"
    );

    expect(screen.getByPlaceholderText("New Password")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Confirm Password")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Reset Password" })
    ).toBeInTheDocument();
  });

  // -------------------
  // Password mismatch
  // -------------------
  test("shows error when passwords do not match", async () => {
    render(<ResetPassword />);

    fireEvent.change(screen.getByPlaceholderText("New Password"), {
      target: { value: "123456" },
    });

    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "654321" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Reset Password" }));

    expect(await screen.findByText("Passwords do not match")).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  // -------------------
  // API error response
  // -------------------
  test("shows server error message when API fails", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Reset failed" }),
    });

    render(<ResetPassword />);

    fireEvent.change(screen.getByPlaceholderText("New Password"), {
      target: { value: "123456" },
    });

    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Reset Password" }));

    expect(await screen.findByText("Reset failed")).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });

  // -------------------
  // Network error
  // -------------------
  test("handles network error", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Network error"));

    render(<ResetPassword />);

    fireEvent.change(screen.getByPlaceholderText("New Password"), {
      target: { value: "123456" },
    });

    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Reset Password" }));

    expect(await screen.findByText("Server error")).toBeInTheDocument();
  });

  // -------------------
  // Success flow
  // -------------------
  test("successful password reset redirects to login", async () => {
    jest.useFakeTimers();

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "ok" }),
    });

    render(<ResetPassword />);

    fireEvent.change(screen.getByPlaceholderText("New Password"), {
      target: { value: "123456" },
    });

    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Reset Password" }));

    expect(
      await screen.findByText("Password reset successful")
    ).toBeInTheDocument();

    // advance 2 seconds timer
    jest.runAllTimers();

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/login");
    });

    jest.useRealTimers();
  });
});
