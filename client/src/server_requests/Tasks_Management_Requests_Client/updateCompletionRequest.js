import axios from "axios";
import { GetUserTasks } from "./getUserTasks";

const updateCompletion = async (id, userId) => {
  try {
    const authToken = document.cookie.replace('managementapp_authToken=', '').split(';');
    const tokenTrimEls = authToken.map(element => element.trim());
    const [token] = tokenTrimEls.filter(pos => pos.startsWith('ey'));

    const data = await GetUserTasks(token, userId); //gets all user tasks

    const taskOnChange = data.find(task => task.idtasks === parseInt(id));

    await axios.patch(`/tasks/completion/${id}`,
      { completed: taskOnChange.completed ? 0 : 1 },
      {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      })

    return await GetUserTasks(token, userId);
  } catch (err) {
    return [];
  }
}

export default updateCompletion;