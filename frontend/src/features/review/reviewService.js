import axios from 'axios';

const API_URL ='/api/v1/reviews';

// Creating a review

const add_review = async (id, data, token) => {
  const response = await axios.post(`${API_URL}/${id}`, data, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    })

  return response.data
}

// Update a review

const update_review = async (id, data, token) => {
  const response = await axios.put(`${API_URL}/${id}`, data, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    })

  return response.data
}


// Delete a review

const delete_review = async (id,token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    })

  return response.data
}


const reviewService = { add_review, update_review, delete_review};

export default reviewService;
