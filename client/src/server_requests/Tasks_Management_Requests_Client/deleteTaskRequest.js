import axios from "axios";
import getAllTasks from "./getAllTasks";

const deleteTask = async (id) => {
  try {
    const authToken = document.cookie.replace('managementapp_authToken=', '').split(';');
    const tokenTrimEls = authToken.map(element => element.trim());
    const [token] = tokenTrimEls.filter(pos => pos.startsWith('ey'));

    await axios.delete(`/tasks/delete/${id}`,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      })

    return await getAllTasks(token)
  } catch (err) {
    alert(err);
    return [];
  }
}

export default deleteTask;