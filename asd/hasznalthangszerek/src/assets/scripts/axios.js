import axios from "axios";

export default axios.create({
  baseURL: "https://hhapi-ywte5.ondigitalocean.app/",
  //withCredentials: true,
});
