import axios from "axios";
export const API_URL = "http://localhost:8080/api";
export default axios.create({
  baseURL: API_URL,
  // timeout: 1000,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    "X-Custom-Header": "foobar",
  },
});
