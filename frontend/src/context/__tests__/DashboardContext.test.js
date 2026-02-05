// DashboardContext.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import { DashboardContext, useDashboard } from "../DashboardContext";
import '@testing-library/jest-dom';

// Test component to consume the context
const TestComponent = () => {
  const dashboard = useDashboard();
  return <div data-testid="dashboard-value">{dashboard}</div>;
};

describe("DashboardContext", () => {
  test("provides value via context", () => {
    const mockValue = "test-dashboard";

    render(
      <DashboardContext.Provider value={mockValue}>
        <TestComponent />
      </DashboardContext.Provider>
    );

    const displayed = screen.getByTestId("dashboard-value");
    expect(displayed).toHaveTextContent(mockValue);
  });

  test("returns null when used outside provider", () => {
    render(<TestComponent />);
    const displayed = screen.getByTestId("dashboard-value");
    expect(displayed).toHaveTextContent(""); // null renders as empty string
  });
});
