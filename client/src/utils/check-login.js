import axios from "axios";

export const isLogin = async () => {
  try {
    await axios.get("/api/users/currentuser");
    console.log("this is loggedin");

    return true;
  } catch (e) {
    console.log("this is not");

    return false;
  }
};
