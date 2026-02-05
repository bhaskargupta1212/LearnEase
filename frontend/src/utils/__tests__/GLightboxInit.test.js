// GLightboxInit.test.js
import { render, unmount } from "@testing-library/react";
import GLightboxInit from "../GLightboxInit";

// Create a mock GLightbox function
const mockDestroy = jest.fn();
const mockGLightbox = jest.fn(() => ({ destroy: mockDestroy }));

// Mock the dynamic import of 'glightbox'
jest.mock("glightbox", () => {
  return {
    __esModule: true,
    default: mockGLightbox,
  };
});

describe("GLightboxInit Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders nothing (null)", () => {
    const { container } = render(<GLightboxInit />);
    expect(container.firstChild).toBeNull();
  });

  test("initializes GLightbox with correct options", async () => {
    render(<GLightboxInit />);

    // Wait for the async import inside useEffect
    await new Promise(process.nextTick);

    expect(mockGLightbox).toHaveBeenCalledWith({
      selector: ".glightbox",
      touchNavigation: true,
      loop: true,
      autoplayVideos: true,
    });
  });

  test("calls destroy on unmount", async () => {
    const { unmount } = render(<GLightboxInit />);

    // Wait for async import
    await new Promise(process.nextTick);

    unmount(); // trigger cleanup
    expect(mockDestroy).toHaveBeenCalled();
  });
});
