// MobileNav.test.js
import { render, fireEvent } from "@testing-library/react";
import MobileNav from "../MobileNav";

describe("MobileNav Component", () => {
  let toggleBtn;

  beforeEach(() => {
    // Set up a fake toggle button in the DOM
    document.body.innerHTML = `<button class="mobile-nav-toggle bi-list"></button>`;
    toggleBtn = document.querySelector(".mobile-nav-toggle");
  });

  afterEach(() => {
    // Clean up classes after each test
    document.body.className = "";
  });

  test("renders nothing (null)", () => {
    const { container } = render(<MobileNav />);
    expect(container.firstChild).toBeNull();
  });

  test("toggles classes on click", () => {
    render(<MobileNav />);

    // Initial classes
    expect(document.body.classList.contains("mobile-nav-active")).toBe(false);
    expect(toggleBtn.classList.contains("bi-list")).toBe(true);
    expect(toggleBtn.classList.contains("bi-x")).toBe(false);

    // Click to toggle
    fireEvent.click(toggleBtn);

    expect(document.body.classList.contains("mobile-nav-active")).toBe(true);
    expect(toggleBtn.classList.contains("bi-list")).toBe(false);
    expect(toggleBtn.classList.contains("bi-x")).toBe(true);

    // Click again to toggle back
    fireEvent.click(toggleBtn);

    expect(document.body.classList.contains("mobile-nav-active")).toBe(false);
    expect(toggleBtn.classList.contains("bi-list")).toBe(true);
    expect(toggleBtn.classList.contains("bi-x")).toBe(false);
  });

  test("removes event listener on unmount", () => {
    const { unmount } = render(<MobileNav />);

    // Spy on removeEventListener
    const removeSpy = jest.spyOn(toggleBtn, "removeEventListener");

    unmount();

    expect(removeSpy).toHaveBeenCalledWith("click", expect.any(Function));

    removeSpy.mockRestore();
  });
  test("does nothing if toggle button is not present", () => {
    // Ensure no toggle button exists
    document.body.innerHTML = ""; // no .mobile-nav-toggle
    render(<MobileNav />);

    // Nothing should crash and container should be null
    expect(document.body.classList.contains("mobile-nav-active")).toBe(false);
  });
});
