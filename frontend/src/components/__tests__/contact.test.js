import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Contact from "../contact";


act(() => {
  jest.runOnlyPendingTimers();
});
act(() => {
  jest.advanceTimersByTime(10000);
});


describe("Contact component", () => {

  test("renders contact section", () => {
    render(<Contact />);
    expect(document.getElementById("contact")).toBeInTheDocument();
    });



  test("renders google map iframe", () => {
    render(<Contact />);

    const map = screen.getByTitle("Office Location");

    expect(map).toBeInTheDocument();
    expect(map).toHaveAttribute("src", expect.stringContaining("google.com/maps"));
  });


  test("renders contact information", () => {
    render(<Contact />);

    expect(screen.getByText("Office Address")).toBeInTheDocument();
    expect(screen.getByText(/123 Innovation Drive/i)).toBeInTheDocument();

    expect(screen.getByText("Call Us")).toBeInTheDocument();
    expect(screen.getByText("+1 (415) 987-6543")).toBeInTheDocument();

    expect(screen.getByText("Email Us")).toBeInTheDocument();
    expect(screen.getByText("support@learnease.com")).toBeInTheDocument();
  });


  test("renders contact form fields", () => {
    render(<Contact />);

    expect(screen.getByPlaceholderText("Your Full Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Subject")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Tell us how we can help you...")
    ).toBeInTheDocument();
  });


  test("renders send message button", () => {
    render(<Contact />);

    expect(
      screen.getByRole("button", { name: /Send Message/i })
    ).toBeInTheDocument();
  });


  test("form submission is handled", () => {
  render(<Contact />);

  const form = document.querySelector("form");

  const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
  const preventDefaultSpy = jest.spyOn(submitEvent, "preventDefault");

  form.dispatchEvent(submitEvent);

  expect(preventDefaultSpy).toHaveBeenCalled();
});


});
