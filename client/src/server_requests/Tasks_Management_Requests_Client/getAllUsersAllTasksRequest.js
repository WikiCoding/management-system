import axios from "axios";

const getUsers = async () => {
  try {
    const authToken = document.cookie.replace('managementapp_authToken=', '').split(';');
    const tokenTrimEls = authToken.map(element => element.trim());
    const [token] = tokenTrimEls.filter(pos => pos.startsWith('ey'));

    const result = await axios.get(`/users/tasks/all`, {
      headers: { 'Authorization': 'Bearer ' + token }
    });

    return result.data;
  } catch (err) {
    alert(err);
    return [];
  }
}

export default getUsers;