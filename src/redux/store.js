import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from '../features/calendarSlice';

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});

export default store;
