import { configureStore } from '@reduxjs/toolkit';


import craftReducer from './crafts/craftSlice';
import locationReducer from './locations/locationSlice';
import authReducer from './auth/authSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    craft: craftReducer,
    location: locationReducer
  },
});
