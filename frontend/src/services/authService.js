const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const signupUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Signup failed");
  }

  return result;
};
