import { configureStore } from '@reduxjs/toolkit';
import UsersReducer from './users/usersSlice';

const store = configureStore({
  reducer: {
    users: UsersReducer,
  },
});

export default store;