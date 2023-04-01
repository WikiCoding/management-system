import Button from "../../Components/Button";
import InputText from "../../Components/inputText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import createProjectTask from "../../server_requests/Project_Planner_Requests_Client/createProjectTaskRequest";

const CreateProjectTaskPage = () => {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState('');
  const [taskDuration, setTaskDuration] = useState(0);
  const [taskPredecessor, setTaskPredecessor] = useState(0);
  const workingProject = localStorage.getItem('managementapp_workingProj');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await createProjectTask(workingProject, taskName, taskDuration, taskPredecessor)

    alert(result.data);

    navigate(`/project/${workingProject}`);
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h3>Create Project Task Page</h3>
        <div>
          <label>Task Name</label>
          <InputText onChange={(e) => setTaskName(e.target.value)} />
        </div>
        <div>
          <label>Task Duration (days)</label>
          <InputText type="number" onChange={(e) => setTaskDuration(e.target.value)} />
        </div>
        <div>
          <label>Task Predecessor (id)</label>
          <InputText type="number" onChange={(e) => setTaskPredecessor(e.target.value)} />
        </div>
        <Button className="waves-effect waves-light btn-large link-add">Add task to project</Button>
      </form>
    </div>
  )
}

export default CreateProjectTaskPage