import { GetUserTasks } from "../../server_requests/Tasks_Management_Requests_Client/getUserTasks";
import { useState, useEffect } from "react";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";
import updateCompletion from "../../server_requests/Tasks_Management_Requests_Client/updateCompletionRequest";
import updateSummary from "../../server_requests/Tasks_Management_Requests_Client/updateSummaryRequest";
import deleteTask from "../../server_requests/Tasks_Management_Requests_Client/deleteTaskRequest";
import logout from "../../server_requests/Login_Register_Requests_Client/logoutRequest";
import getUsers from "../../server_requests/Tasks_Management_Requests_Client/getAllUsersAllTasksRequest"


const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  //the browser can hold other cookies that are concatened as 1 string. Therefore all the manipulation below.
  const authToken = document.cookie.replace('managementapp_authToken=', '').split(';');
  const tokenTrimEls = authToken.map(element => element.trim());
  const [token] = tokenTrimEls.filter(pos => pos.startsWith('ey'));

  const id = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');

  const fetchTasks = async () => {
    //get this info from /tasks/user/:id in case it's a technician
    //get this info from /tasks if is a manager

    if (userRole === 'technician') {
      let data = await GetUserTasks(token, id);
      if (data === '') data = [];
      setTasks(data);
    }

    if (userRole === 'manager') {
      let data = await getUsers();

      if (data === '') data = [];

      setTasks(data);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);


  const handleDelete = async (e) => {

    const taskId = parseInt(e.target.id);
    const result = await deleteTask(taskId);

    if (result.length > 0) {
      setTasks(result);
      alert('Task Deleted');
    } else {
      alert('Something went wrong with your request')
    }
  }

  const handleUpdate = async (e) => {
    const newSummary = prompt('Please provide your new summary:');
    const taskId = parseInt(e.target.id);
    const result = await updateSummary(taskId, newSummary);

    if (result.length > 0) {
      setTasks(result);
    } else {
      alert('Something went wrong');
    }

  }

  const handleCompleted = async (e) => {
    const taskId = e.target.id;
    const userId = localStorage.getItem('userId');

    const result = await updateCompletion(taskId, userId);

    if (result.length > 0) {
      setTasks(result);
    } else {
      alert('Something went wrong.');
    }

  }

  const renderedTasks = tasks.map(taskItem => {
    if (userRole === 'manager') {
      return (
        <div key={taskItem.idtasks} className="container">
          <label>{taskItem.username}: </label>
          <div className={taskItem.completed ? "rendered-tasks completed" : 'rendered-tasks'}>{taskItem.task}
            <Button
              className="waves-effect waves-light btn-large"
              name='float'
              onClick={handleDelete}
              id={taskItem.idtasks}>Delete</Button>
          </div>
        </div>
      )
    }

    if (userRole === 'technician') {
      return (
        <div className="rendered-tasks" key={taskItem.idtasks}>
          <label className="mark-complete">
            <input type="checkbox"
              onChange={handleCompleted}
              id={taskItem.idtasks}
              checked={taskItem.completed ? "checked" : ''} />
            <span className={taskItem.completed ? "completed" : ''}>{taskItem.task}</span>
          </label>
          <Button
            className="waves-effect waves-light btn-large"
            name='float'
            onClick={handleUpdate}
            id={taskItem.idtasks}>Update Summary</Button>
        </div>
      )
    }

    return (null)
  })

  const handleClick = async () => {
    localStorage.clear();
    await logout();
    window.location.href = '/';
  }

  return (
    <div>
      <header>
        {(localStorage.getItem('username') && token) ? <Button onClick={handleClick}
          className="waves-effect waves-light btn-large"
          name='float'>
          Logout
        </Button> : ''}

      </header>
      <h3>
        Welcome {(localStorage.getItem('username') && token) ?
          localStorage.getItem('username') : ', please login to your account.'}</h3>
      {userRole === 'technician'
        && (localStorage.getItem('username')
          && token) ?
        <Link
          className="waves-effect waves-light btn-large link-add"
          to='/create-task'>Add New Task</Link> : null}
      <div>
        {tasks.length !== 0 ? renderedTasks : ''}
      </div>
    </div>
  )
}

export default Dashboard;