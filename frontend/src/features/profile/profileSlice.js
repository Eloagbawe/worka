import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import profileService from './profileService'

const initialState = {
  profile: null,
  userProfile: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Get loggedin user profile - dashboard data
export const getMe = createAsyncThunk('user/me', async (_,thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token
      return await profileService.getMe(token)
  } catch (error) {
      const message = (error.response && error.response.data && 
          error.response.data.message) || error.message || error.toString()

      return thunkAPI.rejectWithValue(message)
    }
})

// Get user profile
export const getUser = createAsyncThunk('user/profile', async (id,thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token
      return await profileService.getUser(id, token)
  } catch (error) {
      const message = (error.response && error.response.data && 
          error.response.data.message) || error.message || error.toString()

      return thunkAPI.rejectWithValue(message)
  }
})

// Update Profile
export const updateProfile = createAsyncThunk('user/update', async (data, thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token
      return await profileService.updateUser(data, token)
  } catch (error) {
      const message = (error.response && error.response.data && 
          error.response.data.message) || error.message || error.toString()

      return thunkAPI.rejectWithValue(message)
  }
})

export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    resetProfile: (state) => 
      initialState
  },
  extraReducers: (builder) => {
    builder
    .addCase(getMe.pending, (state) => {
        state.isLoading = true
    })
    .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.profile = action.payload
    })
    .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.profile = null
    })
    .addCase(getUser.pending, (state) => {
        state.isLoading = true
    })
    .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userProfile = action.payload
    })
    .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.userProfile = null
    })
    .addCase(updateProfile.pending, (state) => {
        state.isLoading = true
    })
    .addCase(updateProfile.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
    })
    .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
    })
  }
})

export const { resetProfile } = profileSlice.actions
export default profileSlice.reducer
