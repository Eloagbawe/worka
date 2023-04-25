import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import reviewService from './reviewService';

const initialState = {
  reviewLoading: false,
  reviewSuccess: false,
  reviewError: false,
  reviewMessage: ''
}

// Add review
export const add_review = createAsyncThunk('review/add', async (params, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const { id, data } = params;
    return await reviewService.add_review(id, data, token);
  } catch (error) {
    const message = (error.response && error.response.data && 
      error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
});

// update review
export const update_review = createAsyncThunk('review/update', async (params, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const {id, data} = params

    return await reviewService.update_review(id, data, token)
  } catch (error) {
    const message = (error.response && error.response.data && 
      error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

// delete review
export const delete_review = createAsyncThunk('review/delete', async(id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await reviewService.delete_review(id, token);
  } catch (error) {
    const message = (error.response && error.response.data && 
      error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    resetReview: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
    .addCase(add_review.pending, (state) => {
      state.reviewLoading = true
      state.reviewSuccess = false
      state.reviewError = false
      state.reviewMessage = ''
    })
    .addCase(add_review.fulfilled, (state) => {
      state.reviewLoading = false
      state.reviewSuccess = true
    })
    .addCase(add_review.rejected, (state, action) => {
      state.reviewLoading = false
      state.reviewError = true
      state.reviewMessage = action.payload
    })
    .addCase(update_review.pending, (state) => {
      state.reviewLoading = true
      state.reviewSuccess = false
      state.reviewError = false
      state.reviewMessage = ''
    })
    .addCase(update_review.fulfilled, (state) => {
      state.reviewLoading = false
      state.reviewSuccess = true
    })
    .addCase(update_review.rejected, (state, action) => {
      state.reviewLoading = true
      state.reviewError = true
      state.reviewMessage = action.payload
    })
    .addCase(delete_review.pending, (state) => {
      state.reviewLoading = true
      state.reviewSuccess = false
      state.reviewError = false
      state.reviewMessage = ''
    })
    .addCase(delete_review.fulfilled, (state) => {
      state.reviewLoading = false
      state.reviewSuccess = true
    })
    .addCase(delete_review.rejected, (state, action) => {
      state.reviewLoading = false
      state.reviewError = true
      state.reviewMessage = action.payload
    })
  }
})

export const { resetReview } = reviewSlice.actions;

export default reviewSlice.reducer;
