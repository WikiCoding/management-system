import axios from "axios";

const checkLogin = async (token) => {
  try {
    await axios.post(`/`, {
      token
    })
  } catch (err) {
    alert(err);
    return 'Error';
  }
}

export default checkLogin;