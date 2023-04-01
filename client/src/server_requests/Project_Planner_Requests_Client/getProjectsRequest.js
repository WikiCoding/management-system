import axios from 'axios';

const getProjects = async () => {
  try {
    const result = await axios.get(`/projects`);

    return result;
  } catch (err) {
    return [];
  }
}

export default getProjects;