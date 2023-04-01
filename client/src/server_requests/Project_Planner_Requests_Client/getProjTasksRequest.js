import axios from "axios";

const getProjTasks = async (projTitle) => {
  try {
    const result = await axios.get(`/projects/tasks/${projTitle}`);

    return result.data;
  } catch (err) {
    return [];
  }
}

export default getProjTasks;