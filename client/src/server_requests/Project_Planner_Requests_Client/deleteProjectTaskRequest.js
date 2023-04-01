import axios from "axios";

const deleteProjectTask = async (id) => {
  try {
    const result = await axios.delete(`/projects/tasks/delete/${id}`);

    return result.data;
  } catch (err) {
    return [];
  }
}

export default deleteProjectTask;