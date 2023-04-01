import { useState } from "react";
import Button from "../../Components/Button";
import InputText from "../../Components/inputText";
import createTask from "../../server_requests/Tasks_Management_Requests_Client/createTaskRequest";
import { useNavigate } from "react-router-dom";

const AddNewTaskPage = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState('');

  const handleTask = (e) => {
    const data = e.target.value;
    setTask(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await createTask(task);

    if (result === 201) {
      alert('Created!');
      navigate('/dashboard')
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="col s12">
        <h3>New Task</h3>
        <InputText onChange={handleTask} placeholder="your-task" type="text" className="validate">Task Summary</InputText>
        <Button className="waves-effect waves-light btn-large">Submit</Button>
      </form>
    </div>
  )
}

export default AddNewTaskPage;