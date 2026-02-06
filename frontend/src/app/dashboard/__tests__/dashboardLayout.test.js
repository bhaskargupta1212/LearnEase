// dashboardLayout.test.js
import { render, screen, waitFor } from "@testing-library/react";
import DashboardLayout from "../layout";
import { authFetch } from "@/utils/auth";
import { useRouter } from "next/navigation";

// Mock authFetch and useRouter
jest.mock("@/utils/auth", () => ({
  authFetch: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock Sidebar with a unique test id
jest.mock("@/components/dashboard/Sidebar", () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

describe("DashboardLayout", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({ push: pushMock });
    jest.clearAllMocks();
  });

  test("renders children and Sidebar after successful fetch", async () => {
    const mockUser = { name: "Alice", role: "Admin" };

    // Mock authFetch to return user data
    authFetch.mockResolvedValueOnce({
      json: async () => ({ user: mockUser }),
    });

    render(
      <DashboardLayout>
        <div data-testid="child">Child Content</div>
      </DashboardLayout>
    );

    // Wait for loading to finish
    await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());

    // Sidebar
    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toHaveTextContent("Child Content");

    // Children
    const child = screen.getByTestId("child");
    expect(child).toHaveTextContent("Child Content");
  });
});
