// dashboardPage.test.js
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

    // Get the actual heading element
    const heading = screen.getByRole("heading", { level: 2 });

    expect(heading).toHaveTextContent(`Welcome back, ${mockUser.name}`);
  });

  test("renders user role", () => {
    render(<DashboardPage />);

    // Find the label first, then assert full text
    const roleParagraph = screen.getByText("Role:", { exact: false }).closest("p");

    expect(roleParagraph).toHaveTextContent(`Role: ${mockUser.role}`);
  });
});
