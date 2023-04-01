import axios from "axios";

const createUserRequest = async (username, email, password, manager, selection, adminPW) => {
  try {
    if (selection === null) { alert('You need to provide your Role'); return }
    if (!email.includes('@')) return alert('You need to enter a valid email');
    if (manager && !adminPW) return alert('You need to provide a valid admin password');

    const result = await axios.post(`/register`, {
      username,
      email,
      password,
      managerEmail: manager,
      position: selection.value,
      adminPW
    })

    return result;

  } catch (err) {
    return 'Error'
  }

}

export default createUserRequest;