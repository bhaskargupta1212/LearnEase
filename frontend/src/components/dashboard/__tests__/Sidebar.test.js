import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../Sidebar";
import { logout } from "@/utils/auth";
import { usePathname } from "next/navigation";

/* -------------------- MOCKS -------------------- */

jest.mock("@/utils/auth", () => ({
  logout: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

/* -------------------- TESTS -------------------- */

describe("Sidebar Component", () => {
  const mockUser = {
    name: "John Doe",
    role: "student",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Student Panel title based on role", () => {
    usePathname.mockReturnValue("/dashboard");

    render(<Sidebar user={mockUser} />);

    expect(screen.getByText("Student Panel")).toBeInTheDocument();
  });

  test("renders Trainer Panel title", () => {
    usePathname.mockReturnValue("/dashboard");

    render(<Sidebar user={{ ...mockUser, role: "trainer" }} />);

    expect(screen.getByText("Trainer Panel")).toBeInTheDocument();
  });

  test("renders Admin Panel title", () => {
    usePathname.mockReturnValue("/dashboard");

    render(<Sidebar user={{ ...mockUser, role: "admin" }} />);

    expect(screen.getByText("Admin Panel")).toBeInTheDocument();
  });

  test("falls back to Dashboard title when role is missing", () => {
    usePathname.mockReturnValue("/dashboard");

    render(<Sidebar user={{ name: "No Role" }} />);

    expect(
      screen.getByRole("heading", { name: "Dashboard" })
    ).toBeInTheDocument();
  });

  test("toggles sidebar open and close when menu button is clicked", () => {
    usePathname.mockReturnValue("/dashboard");

    const { container } = render(<Sidebar user={mockUser} />);

    const toggleButton = container.querySelector(".menu-btn");

    fireEvent.click(toggleButton);
    expect(container.querySelector(".sidebar")).toHaveClass("open");

    fireEvent.click(toggleButton);
    expect(container.querySelector(".sidebar")).not.toHaveClass("open");
  });

  test("adds active class to current route link", () => {
    usePathname.mockReturnValue("/dashboard/profile");

    render(<Sidebar user={mockUser} />);

    const activeLink = screen.getByText("My Profile");
    expect(activeLink).toHaveClass("active");
  });

  test("closes sidebar when clicking a navigation link", () => {
    usePathname.mockReturnValue("/dashboard");

    const { container } = render(<Sidebar user={mockUser} />);

    const toggleButton = container.querySelector(".menu-btn");
    const sidebar = container.querySelector(".sidebar");

    // Open sidebar
    fireEvent.click(toggleButton);
    expect(sidebar).toHaveClass("open");

    // Click correct link name
    fireEvent.click(screen.getByText("Explore All Courses"));

    expect(sidebar).not.toHaveClass("open");
  });

  test("renders user name", () => {
    usePathname.mockReturnValue("/dashboard");

    render(<Sidebar user={mockUser} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("calls logout function when logout button is clicked", () => {
    usePathname.mockReturnValue("/dashboard");

    render(<Sidebar user={mockUser} />);

    fireEvent.click(screen.getByText("Logout"));

    expect(logout).toHaveBeenCalledTimes(1);
  });

  test("renders student-only link", () => {
    usePathname.mockReturnValue("/dashboard");

    render(<Sidebar user={mockUser} />);

    expect(screen.getByText("My Enrolled Courses")).toBeInTheDocument();
  });

  test("renders admin-only link", () => {
    usePathname.mockReturnValue("/dashboard");

    render(<Sidebar user={{ ...mockUser, role: "admin" }} />);

    expect(screen.getByText("Add Course")).toBeInTheDocument();
  });
});
