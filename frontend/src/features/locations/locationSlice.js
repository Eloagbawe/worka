import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { toast } from "react-toastify";
import locationService from './locationService';

const initialState = {
  locations: [],
  locationsError: false,
  locationsSuccess: false,
  locationsLoading: false,
  locationsMessage: ''
}

// Get Locations

export const getLocations = createAsyncThunk('locations/all', async(_, thunkAPI) => {
  try {
    return await locationService.get_locations();
  } catch (error) {
    const message = (error.response && error.response.data && 
      error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue({message, status: error.response.status});
  }
});

export const locationSlice = createSlice({
  name: 'location',
  initialState: initialState,
  reducers: {
    resetLocations: (state) => initialState
  },

  extraReducers: (builder) => {
    builder
    .addCase(getLocations.pending, (state) => {
      state.locationsLoading = true;
    })
    .addCase(getLocations.fulfilled, (state, action) => {
      state.locationsLoading = false;
      state.locationsSuccess = true;
      state.locations = action.payload;
    })
    .addCase(getLocations.rejected, (state, action) => {
      state.locationsLoading = false;
      state.locationsError = true;
      state.locationsMessage = action.payload;
    })
  }
});

export const { resetLocations } = locationSlice.actions;

export default locationSlice.reducer;
