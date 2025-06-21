import axios from "axios";

export const BaseUrl = "http://localhost:8000/";

const instance = axios.create({
  baseURL: BaseUrl,
  withCredentials: true,
});

// General GET request
export const get = (url, params) => instance.get(url, { params });

// POST request with flexible content type
export const post = (url, data, isFormData = false) =>
  instance.post(url, data, {
    headers: {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    },
    withCredentials: true,
  });

// PATCH and DELETE
export const patch = (url, data) => instance.patch(url, data);
export const delet = (url) => instance.delete(url);
