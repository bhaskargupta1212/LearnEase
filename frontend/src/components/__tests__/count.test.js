import { render, screen } from "@testing-library/react";
import Counts from "../count";

describe("Counts component", () => {
  test("renders counts section", () => {
    render(<Counts />);

    const section = document.getElementById("counts");
    expect(section).toBeInTheDocument();
  });

  test("renders all statistics labels", () => {
    render(<Counts />);

    expect(screen.getByText("Students Enrolled")).toBeInTheDocument();
    expect(screen.getByText("Available Courses")).toBeInTheDocument();
    expect(screen.getByText("Assessments Conducted")).toBeInTheDocument();
    expect(screen.getByText("Expert Trainers")).toBeInTheDocument();
  });

  test("renders four purecounter elements", () => {
    render(<Counts />);

    const counters = document.querySelectorAll(".purecounter");
    expect(counters.length).toBe(4);
  });

  test("purecounter elements have correct end values", () => {
    render(<Counts />);

    const counters = document.querySelectorAll(".purecounter");

    expect(counters[0]).toHaveAttribute("data-purecounter-end", "1500");
    expect(counters[1]).toHaveAttribute("data-purecounter-end", "75");
    expect(counters[2]).toHaveAttribute("data-purecounter-end", "120");
    expect(counters[3]).toHaveAttribute("data-purecounter-end", "35");
  });

  test("section has correct CSS classes", () => {
    render(<Counts />);

    const section = document.getElementById("counts");
    expect(section).toHaveClass("section");
    expect(section).toHaveClass("counts");
    expect(section).toHaveClass("light-background");
  });
});
