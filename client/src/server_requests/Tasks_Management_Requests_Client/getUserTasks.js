import axios from "axios";

const GetUserTasks = async (token, id) => {
  try {
    const result = await axios.get(`/tasks/user/${id}`, {
      headers: { 'Authorization': 'Bearer ' + token }
    })

    return result.data;
  } catch (err) {
    alert(err);
    return [];
  }
}

export { GetUserTasks };