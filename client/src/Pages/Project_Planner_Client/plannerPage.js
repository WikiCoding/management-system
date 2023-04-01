import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import getProjects from "../../server_requests/Project_Planner_Requests_Client/getProjectsRequest";
import deleteProj from "../../server_requests/Project_Planner_Requests_Client/deleteProjectRequest";

const PlannerPage = () => {

  const [loadedProjs, setLoadedProjs] = useState([]);

  const fetchProjs = async () => {
    const projs = await getProjects();

    setLoadedProjs(projs.data)
  }

  useEffect(() => {
    fetchProjs();
  }, []);

  const renderedProjs = loadedProjs.map((proj) => {
    const handleDelete = async () => {
      const updatedData = loadedProjs.filter(del => del.idprojs !== proj.idprojs);

      setLoadedProjs(updatedData);

      const result = await deleteProj(proj.idprojs)

      alert(result.data);
    }
    return (
      <div className="rendered-tasks" key={proj.idprojs}>
        <Link className="drop" to={`/project/${proj.proj_title}`}>{proj.proj_title}</Link>
        <Button name="float" className="waves-effect waves-light btn-large"
          onClick={handleDelete}>
          Delete</Button>
      </div>
    )
  })

  return (
    <div className="container">
      <h1>Planner Start Page</h1>
      <Link to="/project/create"
        className="waves-effect waves-light btn-large link-add">
        Create Project
      </Link>
      <div>
        {renderedProjs}
      </div>
    </div>
  )
}

export default PlannerPage;