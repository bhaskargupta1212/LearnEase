import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddCourseForm from "../AddCourseFrom";
import axios from "axios";

jest.mock("axios");

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

describe("AddCourseForm Component", () => {

  test("renders all form fields", () => {
    render(<AddCourseForm />);

    expect(screen.getByPlaceholderText("Course Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Course Description")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Category (Web Dev, AI, etc)")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Price")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Instructor Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Duration (ex: 12 hours)")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Thumbnail URL")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /upload course/i })).toBeInTheDocument();
  });

  test("shows validation error when required fields missing", async () => {
    render(<AddCourseForm />);

    fireEvent.click(screen.getByRole("button", { name: /upload course/i }));

    expect(await screen.findByText("Title is required")).toBeInTheDocument();
  });

  test("shows error if price is negative", async () => {
    render(<AddCourseForm />);

    fireEvent.change(screen.getByPlaceholderText("Course Title"), {
      target: { value: "React Course" }
    });

    fireEvent.change(screen.getByPlaceholderText("Course Description"), {
      target: { value: "Learn React" }
    });

    fireEvent.change(screen.getByPlaceholderText("Category (Web Dev, AI, etc)"), {
      target: { value: "Web Development" }
    });

    fireEvent.change(screen.getByPlaceholderText("Instructor Name"), {
      target: { value: "Antonio" }
    });

    fireEvent.change(screen.getByPlaceholderText("Duration (ex: 12 hours)"), {
      target: { value: "10 hours" }
    });

    fireEvent.change(screen.getByPlaceholderText("Price"), {
      target: { value: "-100" }
    });

    fireEvent.click(screen.getByRole("button", { name: /upload course/i }));

    expect(await screen.findByText("Price cannot be negative")).toBeInTheDocument();
  });

  test("submits form successfully", async () => {
    axios.post.mockResolvedValue({ data: {} });

    render(<AddCourseForm />);

    fireEvent.change(screen.getByPlaceholderText("Course Title"), {
      target: { value: "React Course" }
    });

    fireEvent.change(screen.getByPlaceholderText("Course Description"), {
      target: { value: "Learn React" }
    });

    fireEvent.change(screen.getByPlaceholderText("Category (Web Dev, AI, etc)"), {
      target: { value: "Web Development" }
    });

    fireEvent.change(screen.getByPlaceholderText("Instructor Name"), {
      target: { value: "Antonio" }
    });

    fireEvent.change(screen.getByPlaceholderText("Duration (ex: 12 hours)"), {
      target: { value: "10 hours" }
    });

    fireEvent.change(screen.getByPlaceholderText("Price"), {
      target: { value: "1000" }
    });

    fireEvent.click(screen.getByRole("button", { name: /upload course/i }));

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledTimes(1)
    );

    expect(await screen.findByText("✅ Course uploaded successfully")).toBeInTheDocument();
  });

  test("shows server error message", async () => {
    axios.post.mockRejectedValue({
      response: { data: { message: "Unauthorized" } }
    });

    render(<AddCourseForm />);

    fireEvent.change(screen.getByPlaceholderText("Course Title"), {
      target: { value: "React Course" }
    });

    fireEvent.change(screen.getByPlaceholderText("Course Description"), {
      target: { value: "Learn React" }
    });

    fireEvent.change(screen.getByPlaceholderText("Category (Web Dev, AI, etc)"), {
      target: { value: "Web Development" }
    });

    fireEvent.change(screen.getByPlaceholderText("Instructor Name"), {
      target: { value: "Antonio" }
    });

    fireEvent.change(screen.getByPlaceholderText("Duration (ex: 12 hours)"), {
      target: { value: "10 hours" }
    });

    fireEvent.change(screen.getByPlaceholderText("Price"), {
      target: { value: "1000" }
    });

    fireEvent.click(screen.getByRole("button", { name: /upload course/i }));

    expect(await screen.findByText("Unauthorized")).toBeInTheDocument();
  });

  test("button shows loading state", async () => {
    axios.post.mockResolvedValue({ data: {} });

    render(<AddCourseForm />);

    fireEvent.change(screen.getByPlaceholderText("Course Title"), {
      target: { value: "React Course" }
    });

    fireEvent.change(screen.getByPlaceholderText("Course Description"), {
      target: { value: "Learn React" }
    });

    fireEvent.change(screen.getByPlaceholderText("Category (Web Dev, AI, etc)"), {
      target: { value: "Web Development" }
    });

    fireEvent.change(screen.getByPlaceholderText("Instructor Name"), {
      target: { value: "Antonio" }
    });

    fireEvent.change(screen.getByPlaceholderText("Duration (ex: 12 hours)"), {
      target: { value: "10 hours" }
    });

    fireEvent.change(screen.getByPlaceholderText("Price"), {
      target: { value: "1000" }
    });

    fireEvent.click(screen.getByRole("button", { name: /upload course/i }));

    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("success message disappears after 5 seconds", async () => {
  jest.useFakeTimers();

  axios.post.mockResolvedValue({ data: {} });

  render(<AddCourseForm />);

  fireEvent.change(screen.getByPlaceholderText("Course Title"), {
    target: { value: "React Course" }
  });

  fireEvent.change(screen.getByPlaceholderText("Course Description"), {
    target: { value: "Learn React" }
  });

  fireEvent.change(screen.getByPlaceholderText("Category (Web Dev, AI, etc)"), {
    target: { value: "Web Development" }
  });

  fireEvent.change(screen.getByPlaceholderText("Instructor Name"), {
    target: { value: "Antonio" }
  });

  fireEvent.change(screen.getByPlaceholderText("Duration (ex: 12 hours)"), {
    target: { value: "10 hours" }
  });

  fireEvent.change(screen.getByPlaceholderText("Price"), {
    target: { value: "1000" }
  });

  fireEvent.click(screen.getByRole("button", { name: /upload course/i }));

  // Wait for success message
  const message = await screen.findByText("✅ Course uploaded successfully");
  expect(message).toBeInTheDocument();

  // Fast-forward 5 seconds
  jest.advanceTimersByTime(5000);

  await waitFor(() => {
    expect(
      screen.queryByText("✅ Course uploaded successfully")
    ).not.toBeInTheDocument();
  });

  jest.useRealTimers();
});


});
