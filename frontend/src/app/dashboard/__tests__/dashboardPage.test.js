// page.test.js
import { render, screen } from "@testing-library/react";
import DashboardPage from "../page";

// Mock the DashboardContext hook
jest.mock("@/context/DashboardContext", () => ({
  useDashboard: jest.fn(),
}));

import { useDashboard } from "@/context/DashboardContext";

describe("DashboardPage Component", () => {
  const mockUser = {
    name: "Alice Smith",
    role: "Manager",
  };

  beforeEach(() => {
    useDashboard.mockReturnValue({ user: mockUser });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders welcome message with user name", () => {
    render(<DashboardPage />);
    expect(screen.getByText(`Welcome, ${mockUser.name}`)).toBeInTheDocument();
  });

  test("renders user role", () => {
    render(<DashboardPage />);
    expect(screen.getByText(`Role: ${mockUser.role}`)).toBeInTheDocument();
  });
});
