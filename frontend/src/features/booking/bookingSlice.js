import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import bookingService from './bookingService';

const initialState = {
  bookings: [],
  bookedDates: [],
  bookingError: false,
  bookingSuccess: false,
  bookingLoading: false,
  bookingMessage: '',
  addBookingSuccess: false,
  addBookingError: false,
  addBookingMessage: ''
}

// Add Booking

export const addBooking = createAsyncThunk('bookings/add', async(params, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const {id, data} = params
    return await bookingService.create_booking(id, data, token);
  } catch (error) {
    const message = (error.response && error.response.data && 
      error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue({message, status: error.response.status});
  }
});


// Get Bookings

export const getBookings = createAsyncThunk('bookings/all', async(_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await bookingService.get_bookings(token);
  } catch (error) {
    const message = (error.response && error.response.data && 
      error.response.data.message) || error.message || error.toString()

      return thunkAPI.rejectWithValue({message, status: error.response.status});
    }
})

// Get booked dates
export const getBookedDates = createAsyncThunk('bookings/bookedDates', async(id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await bookingService.get_booked_dates(id, token);
  } catch (error) {
    const message = (error.response && error.response.data && 
      error.response.data.message) || error.message || error.toString()

      return thunkAPI.rejectWithValue({message, status: error.response.status});
    }
})
// Delete Booking

export const deleteBooking = createAsyncThunk('bookings/delete', async(id, thunkAPI) => {
  try{
    const token = thunkAPI.getState().auth.user.token;
    return await bookingService.delete_booking(id, token);
  } catch (error) {
    const message = (error.response && error.response.data && 
      error.response.data.message) || error.message || error.toString();

      return thunkAPI.rejectWithValue({message, status: error.response.status});
    }
})

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    resetBooking: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
    .addCase(addBooking.pending, (state) => {
      state.bookingLoading = true
      state.addBookingSuccess = false
      state.addBookingError = false
      state.addBookingMessage = ''
    })
    .addCase(addBooking.fulfilled, (state) => {
      state.bookingLoading = false
      state.addBookingSuccess = true
    })
    .addCase(addBooking.rejected, (state, action) => {
      state.bookingLoading = false
      state.addBookingError = true
      state.addBookingMessage = action.payload
    })
    .addCase(getBookings.pending, (state) => {
      state.bookingLoading = true
      state.bookingSuccess = false
      state.bookingError = false
      state.bookingMessage = ''
    })
    .addCase(getBookings.fulfilled, (state, action) => {
      state.bookings = action.payload
      state.bookingLoading = false
      state.bookingSuccess = true
    })
    .addCase(getBookings.rejected, (state, action) => {
      state.bookingLoading = false
      state.bookingError = true
      state.bookingMessage = action.payload
    })
    .addCase(getBookedDates.pending, (state) => {
      state.bookingLoading = true
      state.bookingSuccess = false
      state.bookingError = false
      state.bookingMessage = ''
    })
    .addCase(getBookedDates.fulfilled, (state, action) => {
      state.bookingLoading = false
      state.bookingSuccess = true
      state.bookedDates = action.payload
    })
    .addCase(getBookedDates.rejected, (state, action) => {
      state.bookingLoading = false
      state.bookingError = true
      state.bookingMessage = action.payload
    })
    .addCase(deleteBooking.pending, (state) => {
      state.bookingLoading = true
      state.bookingSuccess = false
      state.bookingError = false
      state.bookingMessage = ''
    })
    .addCase(deleteBooking.fulfilled, (state) => {
      state.bookingLoading = false
      state.bookingSuccess = true
    })
    .addCase(deleteBooking.rejected, (state, action) => {
      state.bookingLoading = false
      state.bookingError = true
      state.bookingMessage = action.payload
    })
  }
})

export const { resetBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
