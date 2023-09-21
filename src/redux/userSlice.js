import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
      userId:''
    },
    reducers: {
      setUserId: (state,details) => {
        state.userId= details.payload.userId;
      }
    }
})

export const { setUserId} = userSlice.actions;

export default userSlice.reducer;
