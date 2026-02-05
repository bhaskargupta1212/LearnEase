// ScrollTop.test.js
import { render, fireEvent } from "@testing-library/react";
import ScrollTop from "../ScrollTop";

describe("ScrollTop Component", () => {
  let scrollTopBtn;

  beforeEach(() => {
    document.body.innerHTML = "";
    scrollTopBtn = document.createElement("div");
    scrollTopBtn.className = "scroll-top";
    document.body.appendChild(scrollTopBtn);

    // Mock window.scrollTo
    window.scrollTo = jest.fn();
    window.scrollY = 0;
  });

  afterEach(() => {
    document.body.className = "";
    jest.clearAllMocks();
  });

  test("renders nothing (null)", () => {
    const { container } = render(<ScrollTop />);
    expect(container.firstChild).toBeNull();
  });

  test("does nothing if .scroll-top is missing", () => {
    document.body.removeChild(scrollTopBtn);
    render(<ScrollTop />);
    fireEvent.scroll(window);
    expect(document.querySelector(".scroll-top")).toBeNull();
  });

  test("adds active class when scrollY > 100", () => {
    scrollTopBtn.classList.remove("active");
    render(<ScrollTop />);
    window.scrollY = 150;
    fireEvent.scroll(window);
    expect(scrollTopBtn.classList.contains("active")).toBe(true);
  });

  test("removes active class when scrollY <= 100", () => {
    scrollTopBtn.classList.add("active");
    render(<ScrollTop />);
    window.scrollY = 50;
    fireEvent.scroll(window);
    expect(scrollTopBtn.classList.contains("active")).toBe(false);
  });

  test("clicking button calls window.scrollTo and prevents default", () => {
    render(<ScrollTop />);
    const clickEvent = new MouseEvent("click", { bubbles: true, cancelable: true });
    const preventDefaultSpy = jest.spyOn(clickEvent, "preventDefault");
    scrollTopBtn.dispatchEvent(clickEvent);
    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  test("toggle is called on load event", () => {
    render(<ScrollTop />);
    window.scrollY = 200;
    fireEvent.load(window);
    expect(scrollTopBtn.classList.contains("active")).toBe(true);
  });

  test("removes scroll listener on unmount", () => {
    const removeSpy = jest.spyOn(window, "removeEventListener");
    const { unmount } = render(<ScrollTop />);
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
    removeSpy.mockRestore();
  });
});
