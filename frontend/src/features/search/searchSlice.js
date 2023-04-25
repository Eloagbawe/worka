import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import searchService from './searchService';

const initialState = {
  results: [],
  pageInfo: {},
  searchError: false,
  searchSuccess: false,
  searchLoading: false,
  searchMessage: ''
}

// Search Artisan

export const searchArtisans = createAsyncThunk('search', async(params, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await searchService.search_artisans(params, token);
  } catch (error) {
    const message = (error.response && error.response.data && 
      error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue({message, status: error.response.status});
  }
});

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    resetSearch: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
    .addCase(searchArtisans.pending, (state) => {
      state.searchLoading = true
      state.searchError = false
      state.searchSuccess = false
      state.searchMessage = ''
    })
    .addCase(searchArtisans.fulfilled, (state, action) => {
      state.searchLoading = false;
      state.searchSuccess = true;
      state.results = action.payload.result
      state.pageInfo = action.payload.pageInfo
    })
    .addCase(searchArtisans.rejected, (state, action) => {
      state.searchLoading = false;
      state.searchError = true;
      state.searchMessage = action.payload
    })
  }
});

export const { resetSearch } = searchSlice.actions;

export default searchSlice.reducer;
