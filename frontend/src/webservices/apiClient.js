// export const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// export async function apiClient(
//   endpoint,
//   { method = "GET", body } = {}
// ) {
//   const config = {
//     method,
//     headers: {},
//   };

//   if (body) {
//     config.headers["Content-Type"] = "application/json";
//     config.body = JSON.stringify(body);
//   }

//   console.log("Request →", `${API_BASE_URL}/${endpoint}`, config);

//   const res = await fetch(`${API_BASE_URL}/${endpoint}`, config);

//   if (!res.ok) {
//     const errMsg = await res.text();
//     throw new Error(errMsg || "API request failed");
//   }

//   return res.json();
// }


// src/webservices/apiClient.js
const API_BASE = import.meta.env.VITE_BASE_URL;

export const apiClient = async (path, options = {}) => {
  const url = new URL(path, API_BASE).toString();

  const opts = { ...options };

  // Ensure we always send cookies (so httpOnly cookie is set/read)
  opts.credentials = opts.credentials ?? "include";

  // Prepare headers & body: if body is FormData, don't set JSON header
  const headers = { ...(opts.headers || {}) };
  if (opts.body && !(opts.body instanceof FormData) && typeof opts.body === "object") {
    headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(opts.body);
  }

  opts.headers = headers;

  const res = await fetch(url, opts);

  // Try to parse JSON, but if no JSON body, return null
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    // throw the parsed error if available, otherwise status text
    throw data || { status: res.status, message: res.statusText };
  }

  return data;
};
