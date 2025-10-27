const API_BASE = process.env.NEXT_PUBLIC_LMS_API_URL || "http://localhost:4000";

export async function loginUser(data: { email: string; password: string }) {
  const res = await fetch(`${API_BASE}/lms/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Login failed: ${errorText}`);
  }
  return res.json();
}

export async function registerUser(data: { name:string; email: string; password: string }) {
  const res = await fetch(`${API_BASE}/lms/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Registration failed: ${errorText}`);
  }
  return res.json();
}
