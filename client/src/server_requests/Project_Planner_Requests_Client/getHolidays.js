import axios from 'axios';

const getHoliday = async (projTitle) => {
  try {
    const result = await axios.get(`/projects/holiday/${projTitle}`);

    return result.data.rows[0].proj_holidays;
  } catch (err) {
    return [];
  }

}

export default getHoliday;