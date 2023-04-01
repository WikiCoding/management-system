import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getHolidays from '../../server_requests/Project_Planner_Requests_Client/getHolidays';
import getProjTasks from "../../server_requests/Project_Planner_Requests_Client/getProjTasksRequest";
import deleteProjectTask from "../../server_requests/Project_Planner_Requests_Client/deleteProjectTaskRequest"
import Button from "../../Components/Button";
import getProject from "../../server_requests/Project_Planner_Requests_Client/getProjectRequest";
import CheckBox from "../../Components/CheckBox";
import updateCompletedProject from "../../server_requests/Project_Planner_Requests_Client/updateCompletedRequest";

const ProjectPage = () => {
  const projTitle = window.location.pathname.replace('/project/', '');
  const [holidays, setHolidays] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [startDate, setStartDate] = useState('');
  //let startDate = '';

  const fetchTasks = async () => {
    const data = await getProjTasks(projTitle);
    setTasks(...tasks, data);
  }

  const fetchHoliday = async () => {
    const data = await getHolidays(projTitle);
    setHolidays(...holidays, data)
  }

  const fetchProject = async () => {
    const data = await getProject(projTitle);
    localStorage.setItem('managementapp_projStart', data.proj_start);
    const date = data.proj_start.split('T');
    setStartDate(new Date(date[0]).toLocaleDateString(navigator.language));
  }

  useEffect(() => {
    fetchProject();
    fetchHoliday();
    fetchTasks();
    localStorage.setItem('managementapp_workingProj', projTitle);
  }, []);

  const renderTasks = tasks.map(task => {
    const handleCompleted = async () => {
      let update = false
      if (task.proj_task_completed) {
        update = false;
      } else {
        update = true;
      }

      const data = await updateCompletedProject(task.id_proj_tasks, update);

      setTasks(data);
    }

    // const handleEdit = async () => {
    //   // TODO
    //   console.log('edit task');
    // }

    const handleDelete = async () => {
      const deleted = tasks.filter(t => t !== task);
      setTasks(deleted);
      const result = await deleteProjectTask(task.id_proj_tasks);
      alert(result);
    }

    const dateSd = task.proj_task_start.split('T');
    const date = new Date(dateSd[0]);
    const dateCorrected = date.setDate(date.getDate() + 1);
    const sDate = new Date(dateCorrected).toLocaleDateString(navigator.language);

    const dateEd = task.proj_task_end.split('T');
    const eDate = new Date(dateEd[0]);
    const eDateCorrected = eDate.setDate(eDate.getDate() + 1);
    const endDate = new Date(eDateCorrected).toLocaleDateString(navigator.language);

    return (
      <div key={task.id_proj_tasks}>
        <div className={task.proj_task_completed ? "grid completed" : 'grid'}>
          <CheckBox onChange={handleCompleted} checked={task.proj_task_completed ? "checked" : ''} />
          <input type='text' value={task.id_proj_tasks} readOnly />
          <input type='text' value={task.proj_task_name} readOnly />
          <input type='text' value={task.proj_task_duration} readOnly />
          <input type='text' value={task.proj_task_pred} readOnly />
          <input type='text' value={sDate} readOnly />
          <input type='text' value={endDate} readOnly />
          {/* <Button onClick={handleEdit}>Edit</Button> */}
          <Button onClick={handleDelete}>Delete</Button>
        </div>
      </div>
    )
  })

  const renderHolidays = holidays.map(holiday => {
    const date = holiday.split('T');

    return (
      <div key={holiday}>
        <label>{new Date(date[0]).toLocaleDateString(navigator.language)}</label>
      </div>
    )
  })

  // const date = localStorage.getItem('managementapp_projStart').split('T');
  // const projectStartDate = new Date(date[0]).toLocaleDateString(navigator.language);

  return (
    <div className="container">
      <div>
        <h3>Actual Date: {new Date(Date.now()).toLocaleDateString(navigator.language)}</h3>
      </div>
      <h3>Project Page of {projTitle}</h3>
      <h3>Project Start date {startDate}</h3>
      <div>
        <h3>Holiday list</h3>
        {renderHolidays}
      </div>
      <div>
        <Link
          className="waves-effect waves-light btn-large link-add"
          to='/project/task/create'>Add task to project</Link>
        <h3>Project Planning</h3>
        <div className='grid'>
          <input type='text' value='✔' readOnly />
          <input type='text' value='Task id' readOnly />
          <input type='text' value='Task Name' readOnly />
          <input type='text' value='Task Duration' readOnly />
          <input type='text' value='Pred. Id' readOnly />
          <input type='text' value='Start Date' readOnly />
          <input type='text' value='End Date' readOnly />
        </div>
        {renderTasks}
      </div>
    </div>
  )
}

export default ProjectPage;