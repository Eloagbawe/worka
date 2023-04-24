import axios from 'axios';

const API_URL ='/api/v1';

// search Artisans
const search_artisans = async(data, token) => {
  const response = await axios.get(`${API_URL}/search`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
      params: data
    })

  return response.data
}

const searchService = { search_artisans };

export default searchService
