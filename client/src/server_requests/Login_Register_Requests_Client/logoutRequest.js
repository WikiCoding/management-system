import axios from "axios";

const logout = async () => {
  try {
    return await axios.post('/logout');
  } catch (err) {
    return 'Error';
  }
}

export default logout;