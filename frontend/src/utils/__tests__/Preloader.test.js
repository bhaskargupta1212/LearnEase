// Preloader.test.js
import { render } from "@testing-library/react";
import Preloader from "../Preloader";

describe("Preloader Component", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("renders nothing (null)", () => {
    const { container } = render(<Preloader />);
    expect(container.firstChild).toBeNull();
  });

  test("does nothing if #preloader element is not present", () => {
    render(<Preloader />);
    // Nothing should crash
    expect(document.querySelector("#preloader")).toBeNull();
  });

  test("removes #preloader on window load", () => {
    // Add preloader element
    const preloader = document.createElement("div");
    preloader.id = "preloader";
    document.body.appendChild(preloader);

    render(<Preloader />);

    // Simulate window load
    window.dispatchEvent(new Event("load"));

    expect(document.querySelector("#preloader")).toBeNull();
  });
});
