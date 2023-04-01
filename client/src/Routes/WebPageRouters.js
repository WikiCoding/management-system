import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useEffect } from "react";
import LandingPage from "../Pages/landingPage";
import LoginPage from "../Pages/Login_Register_Client/loginPage";
import RegisterPage from "../Pages/Login_Register_Client/registerPage";
import Dashboard from "../Pages/Tasks_Management_Client/dashboardPage";
import AddNewTaskPage from "../Pages/Tasks_Management_Client/addNewTaskPage";
import PlannerPage from "../Pages/Project_Planner_Client/plannerPage";
import CreateProject from "../Pages/Project_Planner_Client/createProjectPage";
import ProjectPage from "../Pages/Project_Planner_Client/projectPage";
import CreateProjectTaskPage from "../Pages/Project_Planner_Client/createProjectTaskPage";
import ChatPage from "../Pages/Chat_Client/ChatPage";
import axios from "axios";

const WebPage = () => {

  const fetchHomePage = async () => {
    await axios.get('/');
  }

  useEffect(() => {
    fetchHomePage();
  }, [])

  return (
    <nav>
      <div className="nav-wrapper">
        <BrowserRouter>
          <div className="container">
            <header>
              <Link to="/">Home</Link>
              <Link className="dash-header" to="/dashboard">Dashboard</Link>
              <Link className="dash-header" to="/planner">Planner</Link>
              <Link className="dash-header" to="/chat">Company Chat</Link>
            </header>
          </div>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/create-task' element={<AddNewTaskPage />} />
            <Route path='/planner' element={<PlannerPage />} />
            <Route exact path='/project/create' element={<CreateProject />} />
            <Route path='/project/*' element={<ProjectPage />} />
            <Route path='/project/task/create' element={<CreateProjectTaskPage />} />
            <Route path='/chat' element={<ChatPage />} />
          </Routes>
          <footer className="page-footer">
            <div className="container">
              Developed by Tiago Castro
            </div>
          </footer>
        </BrowserRouter>
      </div>
    </nav>
  )
}

export default WebPage;