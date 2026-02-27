const API_URL = "http://localhost:8000/api/v1";

export async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();

  // store token
  localStorage.setItem("token", data.access_token);

  return data;
}


export async function getListings() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/listings`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  return response.json();
}