import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import roleReducer from './roleSlice';


export default configureStore({
  reducer: {
    user: userReducer,
    role: roleReducer
  },
});
