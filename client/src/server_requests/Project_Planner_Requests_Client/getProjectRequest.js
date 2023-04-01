import axios from "axios";

const getProject = async (projTitle) => {
  try {
    const result = await axios.get(`/projects/${projTitle}`);

    return result.data[0];
  } catch (err) {
    return [];
  }

}

export default getProject;