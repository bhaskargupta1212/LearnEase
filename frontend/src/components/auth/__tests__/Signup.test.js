import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "../Signup";

beforeEach(() => {
  jest.clearAllMocks();
});

// 🌐 mock fetch globally
global.fetch = jest.fn();

describe("Signup component", () => {
  test("renders signup form fields", () => {
    render(<Signup />);

    expect(screen.getByText("Create an Account")).toBeInTheDocument();
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue" })).toBeInTheDocument();
    });


 test("shows error if passwords do not match", async () => {
  render(<Signup />);

  // ✅ Fill REQUIRED fields
  fireEvent.change(screen.getByLabelText("First Name"), {
    target: { value: "John" },
  });

  fireEvent.change(screen.getByLabelText("Last Name"), {
    target: { value: "Doe" },
  });

  fireEvent.change(screen.getByLabelText("Email address"), {
    target: { value: "john@example.com" },
  });

  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "123456" },
  });

  fireEvent.change(screen.getByLabelText("Confirm Password"), {
    target: { value: "abcdef" },
  });

  // ✅ Required checkbox
  fireEvent.click(screen.getByLabelText(/I agree to/i));

  fireEvent.click(screen.getByRole("button", { name: "Continue" }));

  // ✅ Now the submit handler runs
  expect(
    await screen.findByText("Passwords do not match")
  ).toBeInTheDocument();

  // ✅ API must NOT be called
  expect(fetch).not.toHaveBeenCalled();
});



  test("submits form successfully", async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ message: "success" }),
  });

  render(<Signup />);

  fireEvent.change(screen.getByLabelText("First Name"), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByLabelText("Last Name"), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByLabelText("Email address"), {
    target: { value: "john@test.com" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByLabelText("Confirm Password"), {
    target: { value: "password123" },
  });

  // ✅ FIX HERE
  fireEvent.click(
    screen.getByRole("checkbox", { name: /i agree to/i })
  );

  fireEvent.click(screen.getByRole("button", { name: "Continue" }));

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  expect(
    await screen.findByText("Account created successfully 🎉")
  ).toBeInTheDocument();
});


  test("shows API error message on failed signup", async () => {
    fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: "Email already exists" }),
    });

    render(<Signup />);

    fireEvent.change(screen.getByLabelText("First Name"), {
        target: { value: "John" },
    });

    fireEvent.change(screen.getByLabelText("Last Name"), {
        target: { value: "Doe" },
    });

    fireEvent.change(screen.getByLabelText("Email address"), {
        target: { value: "john@test.com" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
        target: { value: "password123" },
    });

    fireEvent.change(screen.getByLabelText("Confirm Password"), {
        target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("checkbox"));

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(
        await screen.findByText("Email already exists")
    ).toBeInTheDocument();
    });

    test("shows error if passwords do not match", async () => {
    render(<Signup />);

    fireEvent.change(screen.getByLabelText("First Name"), {
        target: { value: "John" },
    });

    fireEvent.change(screen.getByLabelText("Last Name"), {
        target: { value: "Doe" },
    });

    fireEvent.change(screen.getByLabelText("Email address"), {
        target: { value: "john@test.com" },
    });

    fireEvent.change(screen.getByLabelText("Password"), {
        target: { value: "123456" },
    });

    fireEvent.change(screen.getByLabelText("Confirm Password"), {
        target: { value: "abcdef" },
    });

    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(
        await screen.findByText("Passwords do not match")
    ).toBeInTheDocument();

    expect(fetch).not.toHaveBeenCalled();
    });




  test("shows server error when fetch throws", async () => {
  fetch.mockRejectedValueOnce(new Error("Network error"));

  render(<Signup />);

  fireEvent.change(screen.getByLabelText("First Name"), {
    target: { value: "John" },
  });

  fireEvent.change(screen.getByLabelText("Last Name"), {
    target: { value: "Doe" },
  });

  fireEvent.change(screen.getByLabelText("Email address"), {
    target: { value: "john@test.com" },
  });

  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "password123" },
  });

  fireEvent.change(screen.getByLabelText("Confirm Password"), {
    target: { value: "password123" },
  });

  fireEvent.click(screen.getByRole("checkbox"));
  fireEvent.click(screen.getByRole("button", { name: "Continue" }));

  expect(
    await screen.findByText("Server not reachable. Try again later.")
  ).toBeInTheDocument();
}); 

test("clears message after 10 seconds", async () => {
  jest.useFakeTimers();

  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ message: "success" }),
  });

  render(<Signup />);

  fireEvent.change(screen.getByLabelText("First Name"), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByLabelText("Last Name"), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByLabelText("Email address"), {
    target: { value: "john@test.com" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByLabelText("Confirm Password"), {
    target: { value: "password123" },
  });

  fireEvent.click(screen.getByRole("checkbox"));
  fireEvent.click(screen.getByRole("button", { name: "Continue" }));

  // message appears
  expect(
    await screen.findByText("Account created successfully 🎉")
  ).toBeInTheDocument();

  // ⏱ advance 10 seconds
  jest.advanceTimersByTime(10000);

  // message removed -> executes lines 35-36
  await waitFor(() => {
    expect(
      screen.queryByText("Account created successfully 🎉")
    ).not.toBeInTheDocument();
  });

  jest.useRealTimers();
});

test("shows default error message when API fails without message", async () => {
  fetch.mockResolvedValueOnce({
    ok: false,
    json: async () => ({}), // 👈 no message
  });

  render(<Signup />);

  fireEvent.change(screen.getByLabelText("First Name"), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByLabelText("Last Name"), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByLabelText("Email address"), {
    target: { value: "john@test.com" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByLabelText("Confirm Password"), {
    target: { value: "password123" },
  });

  fireEvent.click(screen.getByRole("checkbox"));
  fireEvent.click(screen.getByRole("button", { name: "Continue" }));

  expect(
    await screen.findByText("Signup failed")
  ).toBeInTheDocument();
});


});
