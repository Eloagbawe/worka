import axios from 'axios';

const API_URL =`/api/v1/crafts`;

//get craft list
const get_crafts = async () => {
  const response = await axios.get(`${API_URL}/`)

  return response.data;
}


const craftService = { get_crafts };

export default craftService;
