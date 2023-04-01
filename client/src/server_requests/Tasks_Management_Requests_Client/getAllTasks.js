import axios from "axios";

const getAllTasks = async (token) => {
  try {
    const result = await axios.get(`/tasks`, {
      headers: { 'Authorization': 'Bearer ' + token }
    })

    return result.data;
  } catch (err) {
    alert(err);
    return [];
  }
}

export default getAllTasks;