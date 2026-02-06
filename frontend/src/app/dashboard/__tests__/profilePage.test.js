// page.test.js
import { render, screen } from "@testing-library/react";
import ProfilePage from "../profile/page";

// Mock the DashboardContext hook
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

  test("renders user profile information", () => {
    render(<ProfilePage />);
    
    expect(screen.getByText("My Profile")).toBeInTheDocument();
    expect(screen.getByText(`Name: ${mockUser.name}`)).toBeInTheDocument();
    expect(screen.getByText(`Role: ${mockUser.role}`)).toBeInTheDocument();
    expect(screen.getByText(`Email: ${mockUser.email}`)).toBeInTheDocument();
  });
});
