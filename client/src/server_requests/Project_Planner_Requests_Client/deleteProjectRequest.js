import axios from "axios";

const deleteProj = async (id) => {
  try {
    return await axios.delete(`/projects/delete/${id}`);
  } catch (err) {
    return 500;
  }
}

export default deleteProj;