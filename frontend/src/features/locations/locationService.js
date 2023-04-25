import axios from 'axios';

const API_URL =`/api/v1/locations`;

//get locations list
const get_locations = async () => {
  const response = await axios.get(`${API_URL}/`)

  return response.data;
}


const locationService = { get_locations };

export default locationService;
