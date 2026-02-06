import React from "react";
import { render, screen } from "@testing-library/react";

/* ---------------- MOCKS ---------------- */

jest.mock("@/components/PageTitle", () => ({
  __esModule: true,
  default: (props) => (
    <div data-testid="page-title">
      {props.title} - {props.description}
    </div>
  ),
}));

jest.mock("@/components/contact", () => ({
  __esModule: true,
  default: () => <div data-testid="contact-component">Contact Component</div>,
}));

/* ⭐⭐⭐ CORRECT IMPORT ⭐⭐⭐ */
import ContactPage from "../page";

/* ---------------- TESTS ---------------- */

describe("ContactPage", () => {
  test("renders PageTitle with correct text", () => {
    render(<ContactPage />);

    const title = screen.getByTestId("Contact Component");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Contact Component"); 
  });

  test("renders Contact component", () => {
    render(<ContactPage />);
    expect(screen.getByTestId("contact-component")).toBeInTheDocument();
  });

  test("renders section wrapper", () => {
    render(<ContactPage />);
    expect(document.querySelector(".trainers-index")).toBeInTheDocument();
  });
});
