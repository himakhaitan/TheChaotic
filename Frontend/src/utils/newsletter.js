import axios from "axios";
import variable from "../config/variables";

const newsLetter = async (email) => {
  const response = await axios.post(`${variable.serverURL}/newsletter/join`, {
    email,
  });
  if (response) {
    return response.data;
  }
};
export default newsLetter;
