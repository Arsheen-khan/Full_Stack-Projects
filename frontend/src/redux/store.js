import { configureStore } from '@reduxjs/toolkit';
import songReducer from './features/songSlice';
import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    songs: songReducer,
    user: userReducer,
  },
});

export default store;
