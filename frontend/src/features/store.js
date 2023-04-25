import { configureStore } from '@reduxjs/toolkit';


import craftReducer from './crafts/craftSlice';
import locationReducer from './locations/locationSlice';
import authReducer from './auth/authSlice';
import profileReducer from './profile/profileSlice';
import bookingReducer from './booking/bookingSlice';
import reviewReducer from './review/reviewSlice';
import searchReducer from './search/searchSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    craft: craftReducer,
    location: locationReducer,
    profile: profileReducer,
    booking: bookingReducer,
    review: reviewReducer,
    search: searchReducer
  },
});
