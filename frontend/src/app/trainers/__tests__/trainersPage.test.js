import { render, screen } from "@testing-library/react";
import TrainersPage from "../page";

/* ---------------- MOCKS ---------------- */

// Mock PageTitle
jest.mock("@/components/PageTitle", () => ({
  __esModule: true,
  default: ({ title, description }) => (
    <div data-testid="page-title">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  ),
}));

// Mock Trainers component
jest.mock("@/components/trainers", () => ({
  __esModule: true,
  default: () => <div data-testid="trainers-component">Trainers Component</div>,
}));

/* ---------------- TESTS ---------------- */

describe("TrainersPage", () => {
  test("renders PageTitle with correct content", () => {
    render(<TrainersPage />);

    expect(screen.getByTestId("page-title")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Our Expert Trainers" })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /experienced professionals who are passionate about teaching/i
      )
    ).toBeInTheDocument();
  });

  test("renders Trainers component", () => {
    render(<TrainersPage />);

    expect(screen.getByTestId("trainers-component")).toBeInTheDocument();
    expect(screen.getByText("Trainers Component")).toBeInTheDocument();
  });

  test("renders trainers section container", () => {
    const { container } = render(<TrainersPage />);

    const section = container.querySelector(".trainers-index");
    expect(section).toBeInTheDocument();
  });
});
