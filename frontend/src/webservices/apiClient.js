export const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export async function apiClient(
  endpoint,
  { method = "GET", body } = {}
) {
  const config = {
    method,
    headers: {},
  };

  if (body) {
    config.headers["Content-Type"] = "application/json";
    config.body = JSON.stringify(body);
  }

  console.log("Request →", `${API_BASE_URL}/${endpoint}`, config);

  const res = await fetch(`${API_BASE_URL}/${endpoint}`, config);

  if (!res.ok) {
    const errMsg = await res.text();
    throw new Error(errMsg || "API request failed");
  }

  return res.json();
}

