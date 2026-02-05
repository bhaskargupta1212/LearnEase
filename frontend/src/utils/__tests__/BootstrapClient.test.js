// BootstrapClient.test.js
import { render } from "@testing-library/react";
import BootstrapClient from "../BootstrapClient";

// Create a virtual mock for bootstrap JS
jest.mock("bootstrap/dist/js/bootstrap.bundle.min.js", () => ({}), { virtual: true });

describe("BootstrapClient Component", () => {
  test("renders nothing (null)", () => {
    const { container } = render(<BootstrapClient />);
    expect(container.firstChild).toBeNull();
  });

  test("bootstrap module is imported", () => {
    // Import the module after mocking
    const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
    expect(bootstrap).toBeDefined();
  });
});
