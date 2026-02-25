import axios from "axios";

export default axios.create({
  baseURL: "https://hhapi-y9a9u.ondigitalocean.app/",
  withCredentials: true,
});
