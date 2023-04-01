import axios from "axios";

const createTask = async (task) => {
  try {
    const headers = {
      'Content-type': 'application/json',
    }

    const result = await axios.post(`/tasks/add`,
      {
        task: task,
      },
      {
        withCredentials: true,
        headers,
      })

    return result.status;
  } catch (err) {
    return 500;
  }
}

export default createTask;