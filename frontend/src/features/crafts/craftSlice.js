import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import craftService from './craftService';

const initialState = {
  crafts: [],
  craftsError: false,
  craftsSuccess: false,
  craftsLoading: false,
  craftsMessage: ''
}

// Get Crafts

export const getCrafts = createAsyncThunk('crafts/all', async(_, thunkAPI) => {
  try {
    return await craftService.get_crafts();
  } catch (error) {
    const message = (error.response && error.response.data && 
      error.response.data.message) || error.message || error.toString();

    return thunkAPI.rejectWithValue({message, status: error.response.status});
  }
});

export const craftSlice = createSlice({
  name: 'craft',
  initialState: initialState,
  reducers: {
    resetCrafts: (state) => initialState
  },

  extraReducers: (builder) => {
    builder
    .addCase(getCrafts.pending, (state) => {
      state.craftsLoading = true;
    })
    .addCase(getCrafts.fulfilled, (state, action) => {
      state.craftsLoading = false;
      state.craftsSuccess = true;
      state.crafts = action.payload;
    })
    .addCase(getCrafts.rejected, (state, action) => {
      state.craftsLoading = false;
      state.craftsError = true;
      state.craftsMessage = action.payload;
    })
  }
});

export const { resetCrafts } = craftSlice.actions;

export default craftSlice.reducer;
