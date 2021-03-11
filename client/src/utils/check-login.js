import axios from "axios";

async function isLogin() {
  try {
    await axios.get("/api/users/currentuser");
    console.log("this is loggedin");

    return true;
  } catch (e) {
    console.log("this is not");

    return false;
  }
}

const checkLogin = {
  isLogin,
};

export default checkLogin;
