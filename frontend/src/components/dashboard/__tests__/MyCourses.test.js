import { render, screen, waitFor } from "@testing-library/react";
import MyCourses from "../MyCourses";

global.fetch = jest.fn();

/* -------- MOCK next/link -------- */
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }) => <a href={href}>{children}</a>,
}));

/* -------- MOCK next/image -------- */
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => <img {...props} alt={props.alt} />,
}));

describe("MyCourses Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();

    fetch.mockResolvedValue({
    ok: true,
    json: async () => [],
  });
  });

  test("shows loading initially", () => {
    render(<MyCourses />);
    expect(
      screen.getByText("Loading your courses...")
    ).toBeInTheDocument();
  });


  test("renders enrolled courses when fetch succeeds", async () => {
    localStorage.setItem("token", "fake-token");

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: 1,
          title: "React Course",
          description: "Learn React from scratch",
          thumbnail: "/test.jpg",
        },
      ],
    });

    render(<MyCourses />);

    await waitFor(() =>
      expect(screen.getByText("React Course")).toBeInTheDocument()
    );

    expect(screen.getByText("Enrolled")).toBeInTheDocument();
    expect(screen.getByText("Continue Learning →")).toBeInTheDocument();
  });

  test("handles fetch failure", async () => {
    localStorage.setItem("token", "fake-token");

    fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(<MyCourses />);

    await waitFor(() =>
      expect(
        screen.getByText("You are not enrolled in any course 😔")
      ).toBeInTheDocument()
    );
  });

  test("handles network error", async () => {
    localStorage.setItem("token", "fake-token");

    fetch.mockRejectedValueOnce(new Error("Network error"));

    render(<MyCourses />);

    await waitFor(() =>
      expect(
        screen.getByText("You are not enrolled in any course 😔")
      ).toBeInTheDocument()
    );
  });
});
