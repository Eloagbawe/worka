import axios from 'axios';

const API_URL ='/api/v1/users';

// Get Logged In user profile
const getMe = async (token) => {
  const response = await axios.get(`${API_URL}/me`, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    })

  return response.data
}

// Update Logged In user profile
const updateUser = async (data, token) => {
  const response = await axios.put(`${API_URL}/update`, data, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    })

  return response.data
}

// Get user profile
const getUser = async (id, token) => {
  const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    })

  return response.data
}

const profileService = {
  getMe, updateUser, getUser
}

export default profileService;
