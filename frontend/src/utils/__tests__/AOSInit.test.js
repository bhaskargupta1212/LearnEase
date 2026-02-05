// AOSInit.test.js
import { render } from "@testing-library/react";
import AOSInit from "../AOSInit";

// Mock the AOS module
jest.mock("aos", () => ({
  init: jest.fn(),
}));

import AOS from "aos";

describe("AOSInit Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("calls AOS.init on mount with correct config", () => {
    render(<AOSInit />);

    expect(AOS.init).toHaveBeenCalledTimes(1);
    expect(AOS.init).toHaveBeenCalledWith({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 120,
    });
  });
});
