import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import Login from "../Login";
import "@testing-library/jest-dom";

jest.useFakeTimers();

const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

jest.mock("next/link", () => ({ children }) => children);

beforeEach(() => {
  global.fetch = jest.fn();
  Storage.prototype.setItem = jest.fn();
  push.mockClear();
});

test("renders login form", () => {
  render(<Login />);

  expect(screen.getByRole("heading", { name: "Sign In" })).toBeInTheDocument();
  expect(screen.getByLabelText("Email address")).toBeInTheDocument();
  expect(screen.getByLabelText("Password")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
});

test("successful login", async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ token: "abc123", message: "Login successful" }),
  });

  render(<Login />);

  fireEvent.change(screen.getByLabelText("Email address"), {
    target: { value: "test@mail.com" },
  });

  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "123456" },
  });

  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
  });

  expect(await screen.findByText("Login successful")).toBeInTheDocument();
  expect(localStorage.setItem).toHaveBeenCalledWith("token", "abc123");

  // redirect timer
  await act(async () => {
    jest.advanceTimersByTime(1500);
  });

  expect(push).toHaveBeenCalledWith("/dashboard");
});

test("shows API error message", async () => {
  fetch.mockResolvedValueOnce({
    ok: false,
    json: async () => ({ message: "Invalid credentials" }),
  });

  render(<Login />);

  fireEvent.change(screen.getByLabelText("Email address"), {
    target: { value: "wrong@mail.com" },
  });

  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "wrong" },
  });

  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
  });

  expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
});

test("shows server unreachable message", async () => {
  fetch.mockRejectedValueOnce(new Error("Network"));

  render(<Login />);

  fireEvent.change(screen.getByLabelText("Email address"), {
    target: { value: "test@mail.com" },
  });

  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "123456" },
  });

  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
  });

  expect(await screen.findByText("Server not reachable")).toBeInTheDocument();
});

test("button disabled while loading", async () => {
  let resolveFetch;
  fetch.mockReturnValueOnce(
    new Promise((res) => {
      resolveFetch = res;
    })
  );

  render(<Login />);

  fireEvent.change(screen.getByLabelText("Email address"), {
    target: { value: "test@mail.com" },
  });

  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "123456" },
  });

  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
  });

  expect(screen.getByRole("button", { name: "Signing in..." })).toBeDisabled();

  await act(async () => {
    resolveFetch({
      ok: true,
      json: async () => ({ token: "t", message: "Login successful" }),
    });
  });
});

test("clears message after 10 seconds", async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ token: "t", message: "Login successful" }),
  });

  render(<Login />);

  fireEvent.change(screen.getByLabelText("Email address"), {
    target: { value: "test@mail.com" },
  });

  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "123456" },
  });

  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
  });

  expect(await screen.findByText("Login successful")).toBeInTheDocument();

  await act(async () => {
    jest.advanceTimersByTime(10000);
  });

  await waitFor(() =>
    expect(screen.queryByText("Login successful")).not.toBeInTheDocument()
  );
});

it("shows default error message when API returns no message", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({}) // no message
    })
  );

  render(<Login />);

  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: "test@test.com" }
  });

  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "wrongpass" }
  });

  fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

  expect(await screen.findByText("Login failed")).toBeInTheDocument();
});

