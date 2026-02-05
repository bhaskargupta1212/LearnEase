// auth.test.js
import { getToken, authFetch, logout } from "../auth";

describe("auth.js", () => {
  const ORIGINAL_LOCATION = window.location;

  beforeEach(() => {
    // Reset localStorage
    localStorage.clear();

    // Mock fetch
    global.fetch = jest.fn();

    // Reset window.location
    delete window.location;
    window.location = { href: "" };
  });

  afterAll(() => {
    window.location = ORIGINAL_LOCATION;
  });

  // ------------------ getToken ------------------
  test("getToken returns null on server side", () => {
    const originalWindow = global.window;
    delete global.window;
    expect(getToken()).toBeNull();
    global.window = originalWindow;
  });

  test("getToken returns token from localStorage", () => {
    localStorage.setItem("token", "abc123");
    expect(getToken()).toBe("abc123");
  });

  // ------------------ authFetch ------------------
  test("authFetch calls fetch with Authorization header if token exists", async () => {
    localStorage.setItem("token", "abc123");

    global.fetch.mockResolvedValueOnce({
      status: 200,
      json: async () => ({ success: true }),
    });

    const res = await authFetch("/test");

    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_URL}/test`,
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer abc123",
          "Content-Type": "application/json",
        }),
      }),
    );

    expect(res.status).toBe(200);
  });

  test("authFetch throws error and calls logout on 401", async () => {
    localStorage.setItem("token", "abc123");

    // Mock fetch to return 401
    global.fetch.mockResolvedValueOnce({ status: 401 });

    // Mock window.location
    delete window.location;
    window.location = { href: "" };

    await expect(authFetch("/private")).rejects.toThrow("Unauthorized");
    expect(window.location.href).toBe("http://localhost/");
  });

  // ------------------ logout ------------------
  test("logout clears localStorage and redirects", () => {
    localStorage.setItem("token", "abc123");

    logout();
    expect(localStorage.getItem("token")).toBeNull();
    expect(window.location.href).toBe("http://localhost/");
  });

  describe("getToken", () => {
    const originalWindow = global.window;

    afterEach(() => {
      // Restore global window after each test
      global.window = originalWindow;
      localStorage.clear();
    });

    test("returns null when window is undefined (server-side)", () => {
      delete global.window; // simulate server-side
      expect(getToken()).toBeNull();
    });

    test("returns token from localStorage when window exists (client-side)", () => {
      global.window = Object.create(originalWindow); // simulate client-side
      localStorage.setItem("token", "abc123");
      expect(getToken()).toBe("abc123");
    });
  });
});
