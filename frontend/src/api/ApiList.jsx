import { data } from "react-router-dom";
import { apiClient } from "../webservices/apiClient";

export const getVendors = () => apiClient("vendors");

export const createVendor = (data) => apiClient("vendors", {
  method: "POST",
  body: data,
});

export const editVendor = (id, data) => apiClient(`vendors/${id}`, {
  method: "PUT",
  body: data,
});

export const deleteVendor = (id) => apiClient(`vendors/${id}`, {
  method: "DELETE",
});

export const loginUser = (data) => apiClient(`auth/login`,{
  method: "POST",
  body: data,
});

export const registerUser = (data) => apiClient(`auth/register`,{
  method: "POST",
  body: data,
});



