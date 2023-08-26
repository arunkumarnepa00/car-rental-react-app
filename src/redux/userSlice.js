import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
      userId:''
    },
    reducers: {
      setUserId: (state,details) => {
        state.userId= details.payload.userId;
      },
      getUserId: (state)=>{
        return state
      }
    }
})

export const { setUserId,getUserId} = userSlice.actions;

export default userSlice.reducer;
