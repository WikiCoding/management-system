import axios from "axios";
import businessDaysLogic from "../../utils/businessDaysLogic";

const createProjectTask = async (projTitle, projTask, projTaskDuration, projTaskPred) => {

  const [taskStartDate, taskEndDate] = await businessDaysLogic(projTaskPred, projTaskDuration);

  try {
    const result = await axios.post(`/projects/tasks/create/${projTitle}`, {
      projTask, projTaskDuration, projTaskPred, taskStartDate, taskEndDate
    })
    return result;
  } catch (err) {
    return 500;
  }

}

export default createProjectTask;