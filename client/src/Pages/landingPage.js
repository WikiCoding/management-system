import { Link } from "react-router-dom";

const LandingPage = () => {

  return (
    <div>
      <h1>Landing Page</h1>
      <Link to="/login" className="waves-effect waves-light btn-large" style={{ "margin": "10px" }}>Login</Link>
      <Link to="/register" className="waves-effect waves-light btn-large">Register</Link>
    </div>
  )
}

export default LandingPage;