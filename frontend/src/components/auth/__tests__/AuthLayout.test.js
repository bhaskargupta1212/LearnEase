import { render, screen } from "@testing-library/react";
import AuthLayout from "../AuthLayout";

describe("AuthLayout component", () => {
  test("renders the title", () => {
    render(
      <AuthLayout title="Sign In">
        <div>Form Content</div>
      </AuthLayout>
    );

    expect(
      screen.getByRole("heading", { name: "Sign In" })
    ).toBeInTheDocument();
  });

  test("renders the subtitle when provided", () => {
    render(
      <AuthLayout title="Sign In" subtitle="Welcome back">
        <div>Form Content</div>
      </AuthLayout>
    );

    expect(screen.getByText("Welcome back")).toBeInTheDocument();
  });

  test("does not render subtitle when not provided", () => {
    render(
      <AuthLayout title="Sign In">
        <div>Form Content</div>
      </AuthLayout>
    );

    expect(screen.queryByText("Welcome back")).toBeNull();
  });

  test("renders children content", () => {
    render(
      <AuthLayout title="Sign In">
        <button>Submit</button>
      </AuthLayout>
    );

    expect(
      screen.getByRole("button", { name: "Submit" })
    ).toBeInTheDocument();
  });
});
