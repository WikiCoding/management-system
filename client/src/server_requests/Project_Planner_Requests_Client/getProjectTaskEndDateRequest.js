import axios from "axios";

const getProjTaskEndDate = async (id_proj_tasks) => {
  try {
    const result = await axios.get(`/projects/tasks/id/${id_proj_tasks}`);

    return result.data[0].proj_task_end;
  } catch (err) {
    return '';
  }
}

export default getProjTaskEndDate;