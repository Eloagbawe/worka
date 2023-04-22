import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import bookingService from './bookingService';

const initialState = {
  bookings: [],
  bookingError: false,
  bookingSuccess: false,
  bookingLoading: false,
  bookingMessage: ''
}

// Add Booking

export const add_booking = createAsyncThunk('bookings/add', async(data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await bookingService.add_booking(data, token);
  } catch (error) {
    const message = (error.response && error.response.data && 
      error.response.data.message) || error.message || error.toString()

  return thunkAPI.rejectWithValue(message);
  }
});


// Get Bookings

export const get_bookings = createAsyncThunk('bookings/all', async(_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await bookingService.get_bookings(token);
  } catch (error) {
    const message = (error.response && error.response.data && 
      error.response.data.message) || error.message || error.toString()

  return thunkAPI.rejectWithValue(message);
  }
})

// Delete Booking

export const delete_booking = createAsyncThunk('bookings/delete', async(id, thunkAPI) => {
  try{
    const token = thunkAPI.getState().auth.user.token;
    return await bookingService.delete_booking(id, token);
  } catch (error) {
    const message = (error.response && error.response.data && 
      error.response.data.message) || error.message || error.toString();

  return thunkAPI.rejectWithValue(message);
  }
})

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    resetBooking: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
    .addCase(add_booking.pending, (state) => {
      state.bookingLoading = true
    })
    .addCase(add_booking.fulfilled, (state) => {
      state.bookingLoading = false
      state.bookingSuccess = true
    })
    .addCase(add_booking.rejected, (state, action) => {
      state.bookingLoading = false
      state.bookingError = true
      state.bookingMessage = action.payload
    })
    .addCase(get_bookings.loading, (state) => {
      state.bookingLoading = true
    })
    .addCase(get_bookings.fulfilled, (state, action) => {
      state.bookings = action.payload
      state.bookingLoading = false
      state.bookingSuccess = true
    })
    .addCase(get_bookings.rejected, (state, action) => {
      state.bookingLoading = false
      state.bookingError = true
      state.bookingMessage = action.payload
    })
    .addCase(delete_booking.pending, (state) => {
      state.bookingLoading = true
    })
    .addCase(delete_booking.fulfilled, (state) => {
      state.bookingLoading = false
      state.bookingSuccess = true
    })
    .addCase(delete_booking.rejected, (state, action) => {
      state.bookingLoading = false
      state.bookingError = true
      state.bookingMessage = action.payload
    })
  }
})

export const { resetBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
