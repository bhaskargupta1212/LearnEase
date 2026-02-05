// ScrollHandler.test.js
import { render, fireEvent } from "@testing-library/react";
import ScrollHandler from "../ScrollHandler";

describe("ScrollHandler Component", () => {
  let header;

  beforeEach(() => {
    // Clear DOM
    document.body.innerHTML = "";
    header = document.createElement("div");
    header.id = "header";
    document.body.appendChild(header);
    window.scrollY = 0;
  });

  afterEach(() => {
    document.body.className = "";
    jest.clearAllMocks();
  });

  test("renders nothing (null)", () => {
    const { container } = render(<ScrollHandler />);
    expect(container.firstChild).toBeNull();
  });

  test("does nothing if #header is missing", () => {
    document.body.removeChild(header); // no header
    render(<ScrollHandler />);
    fireEvent.scroll(window);
    expect(document.body.classList.contains("scrolled")).toBe(false);
  });

  test("does nothing if #header does not have required classes", () => {
    render(<ScrollHandler />);
    fireEvent.scroll(window);
    expect(document.body.classList.contains("scrolled")).toBe(false);
  });

  test("adds scrolled class when scrollY > 100 and header has sticky class", () => {
    header.classList.add("sticky-top");
    render(<ScrollHandler />);
    window.scrollY = 200;
    fireEvent.scroll(window);
    expect(document.body.classList.contains("scrolled")).toBe(true);
  });

  test("removes scrolled class when scrollY <= 100", () => {
    header.classList.add("sticky-top");
    document.body.classList.add("scrolled");
    render(<ScrollHandler />);
    window.scrollY = 50;
    fireEvent.scroll(window);
    expect(document.body.classList.contains("scrolled")).toBe(false);
  });

  test("cleans up event listener on unmount", () => {
    header.classList.add("sticky-top");
    const removeSpy = jest.spyOn(window, "removeEventListener");
    const { unmount } = render(<ScrollHandler />);
    unmount();
    expect(removeSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
    removeSpy.mockRestore();
  });

  test("calls toggleScrolled on load event", () => {
    header.classList.add("sticky-top");
    render(<ScrollHandler />);
    window.scrollY = 200;
    fireEvent.load(window);
    expect(document.body.classList.contains("scrolled")).toBe(true);
  });
});
