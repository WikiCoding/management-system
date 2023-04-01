import axios from "axios";


const createProject = async (projTitle, projStart, projHolidays) => {
  try {
    return await axios.post(`/projects`, { projTitle, projStart, projHolidays });
  } catch (err) {
    return 500;
  }
}

export default createProject;