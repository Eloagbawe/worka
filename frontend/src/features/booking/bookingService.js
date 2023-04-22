import axios from 'axios';

const API_URL ='/api/v1/bookings';


// Create booking

const create_booking = async(data, token) => {
    const response = await axios.post(`${API_URL}/`, data, {
        headers: {
            'Authorization': `Bearer ${token}` 
          }
    })

    return response.data;
}

//Get logged in user's bookings

const get_bookings = async (token) => {
    const response = await axios.get(`${API_URL}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      })

    return response.data
}


//Delete Booking

const delete_booking = async (id, token) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      })
  
    return response.data;
}

const bookingService = { create_booking, get_bookings, delete_booking };

export default bookingService;
