import axios from "axios";
// export const API_URL = "http://localhost:8080";
export const API_URL = "https://api.taphoazalo.com";
export default axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
