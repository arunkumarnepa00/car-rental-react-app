import { createSlice } from '@reduxjs/toolkit';

const userRoleSlice = createSlice({
    name: 'role',
    initialState: {
      role:0
    },
    reducers: {
      setRole: (state,details) => {
        console.log(details)
        state.role= details.payload.role;
      },
      getRole: (state)=>{
        return state.role
      }
    }
})

export const { setRole,getRole} = userRoleSlice.actions;

export default userRoleSlice.reducer;
