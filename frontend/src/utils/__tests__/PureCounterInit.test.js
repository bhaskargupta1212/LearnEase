// PureCounterInit.test.js
import { render } from "@testing-library/react";
import PureCounterInit from "../PureCounterInit";
import { usePathname } from "next/navigation";

// Mock next/navigation usePathname
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
})); 

describe("PureCounterInit Component", () => {
  let originalWindow;

  beforeEach(() => {
    originalWindow = global.window;
    global.window = { document: document, PureCounter: undefined }; // clean window
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  afterEach(() => {
    global.window = originalWindow;
  });

  test("renders nothing (null)", () => {
    usePathname.mockReturnValue("/");
    const { container } = render(<PureCounterInit />);
    expect(container.firstChild).toBeNull();
  });

  test("does nothing if window is undefined (server-side)", () => {
    usePathname.mockReturnValue("/");
    const original = global.window;
    delete global.window;
    render(<PureCounterInit />);
    global.window = original;
  });

  test("creates a script tag if PureCounter is not defined", () => {
    usePathname.mockReturnValue("/");
    render(<PureCounterInit />);

    const script = document.querySelector("script[src='/vendor/purecounter/purecounter_vanilla.js']");
    expect(script).toBeInTheDocument();
    expect(script.async).toBe(true);
  });

  test("calls PureCounter if already exists", () => {
    usePathname.mockReturnValue("/");
    const mockPureCounter = jest.fn();
    global.window.PureCounter = mockPureCounter;

    render(<PureCounterInit />);

    expect(mockPureCounter).toHaveBeenCalledTimes(1);
  });

  test("re-initializes on pathname change", () => {
    const mockPureCounter = jest.fn();
    global.window.PureCounter = mockPureCounter;

    // Initial pathname
    usePathname.mockReturnValue("/page1");
    const { rerender } = render(<PureCounterInit />);

    // Change pathname
    usePathname.mockReturnValue("/page2");
    rerender(<PureCounterInit />);

    expect(mockPureCounter).toHaveBeenCalledTimes(2);
  });
  
});

describe("PureCounterInit server-side branch", () => {
  const originalWindow = global.window;

  afterEach(() => {
    global.window = originalWindow; // restore window
    jest.clearAllMocks();
  });

  test("does nothing if window is undefined (server-side)", () => {
    // Remove window to simulate server
    delete global.window;

    usePathname.mockReturnValue("/");

    render(<PureCounterInit />);

    // Nothing should be appended to document body
    expect(document.querySelector("script")).toBeNull();
  });
});
