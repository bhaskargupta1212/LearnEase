import { render, screen } from "@testing-library/react";
import ProfilePage from "../profile/page";

jest.mock("@/context/DashboardContext", () => ({
  useDashboard: jest.fn(),
}));

import { useDashboard } from "@/context/DashboardContext";

describe("ProfilePage Component", () => {
  const mockUser = {
    name: "John Doe",
    role: "Admin",
    email: "john@example.com",
  };

  beforeEach(() => {
    useDashboard.mockReturnValue({ user: mockUser });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders profile information correctly", () => {
    render(<ProfilePage />);

    // Heading
    expect(screen.getByText("Account Information")).toBeInTheDocument();

    // Name
    expect(screen.getAllByText(mockUser.name).length).toBeGreaterThan(0);

    // Role
    expect(screen.getAllByText(mockUser.role).length).toBeGreaterThan(0);

    // Email
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();

    // Button
    expect(screen.getByRole("button", { name: /edit profile/i })).toBeInTheDocument();
  });

  test("shows loading spinner when user is null", () => {
    useDashboard.mockReturnValue({ user: null });

    render(<ProfilePage />);

    expect(screen.getByText(/loading profile/i)).toBeInTheDocument();
  });
});
