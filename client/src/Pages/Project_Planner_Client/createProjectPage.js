import InputText from "../../Components/inputText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import createProject from "../../server_requests/Project_Planner_Requests_Client/createProjectRequest";

const CreateProject = () => {
  const navigate = useNavigate();
  const [projTitle, setProjTitle] = useState('');
  const [projStartDate, setProjStartDate] = useState('');
  const [projDaysOff, setProjDayOff] = useState([]);

  const handleStartDate = (e) => {
    const taskStartDate = new Date(e.target.value);

    //checking if the project starts on a weekend
    if (taskStartDate.getDay() === 0) taskStartDate.setDate(taskStartDate.getDate() + 1);
    if (taskStartDate.getDay() === 6) taskStartDate.setDate(taskStartDate.getDate() + 2);

    setProjStartDate(taskStartDate);
  }

  const handleHoliday = (e) => {
    const data = e.target.value;

    setProjDayOff([...projDaysOff, data])
  }

  const renderedNonWorkingDays = projDaysOff.map(dayOff => {
    const handleDelete = () => {
      const updatedDayOff = projDaysOff.filter(day => day !== dayOff);

      setProjDayOff(updatedDayOff);
    }

    return (<div key={dayOff}>{dayOff}<Button className="waves-effect waves-light btn-large" onClick={handleDelete}>Delete</Button></div>)
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(projStartDate);

    const result = await createProject(projTitle, projStartDate, projDaysOff);

    alert(result.data)

    navigate('/planner')
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>New Project</h2>
        <label>Project Title
          <InputText onChange={(e) => setProjTitle(e.target.value)} />
        </label>
        <label>Project Start Date
          <InputText type="date" onChange={handleStartDate} />
        </label>
        <div>
          <label>Non Working Days
            <InputText type="date" onChange={handleHoliday} />
            <div>
              {renderedNonWorkingDays}
            </div>
          </label>
        </div>
        <Button
          className="waves-effect waves-light btn-large link-add" onClick={handleSubmit}>Add Project</Button>
      </form>
    </div>
  )
}

export default CreateProject;