const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const authFetch = async (endpoint, options = {}) => {
  const token = getToken();

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    logout();
    throw new Error("Unauthorized");
  }

  return res;
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};
