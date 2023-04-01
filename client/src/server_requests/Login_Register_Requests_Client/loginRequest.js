import axios from "axios";

const loginRequest = async (email, password) => {
  try {
    const result = await axios.post(`/login`, {
      email, password
    });

    document.cookie = `managementapp_authToken=${result.data.token}`
    localStorage.setItem('userId', result.data.id);
    localStorage.setItem('userRole', result.data.position);
    localStorage.setItem('username', result.data.username);
    localStorage.setItem('userEmail', result.data.email);

    return result
  } catch (err) {
    return 'Could not Login';
  }

}

export default loginRequest;