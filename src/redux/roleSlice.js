import { createSlice } from '@reduxjs/toolkit';

const userRoleSlice = createSlice({
    name: 'role',
    initialState: {
      role:0
    },
    reducers: {
      setRole: (state,details) => {
        state.role= details.payload.role;
      }
    }
})

export const { setRole} = userRoleSlice.actions;

export default userRoleSlice.reducer;
