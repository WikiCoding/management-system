import axios from "axios";
import getProjTasks from "./getProjTasksRequest";

const updateCompletedProject = async (id, update) => {
  try {
    const projTitle = localStorage.getItem('managementapp_workingProj')
    await axios.patch(`/projects/tasks/update/complete/${id}`, {
      update
    })

    return await getProjTasks(projTitle);
  } catch (err) {
    return [];
  }

}

export default updateCompletedProject;