import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading:false,
    isAuthenticated: false,
    message:''
  },
  reducers: {
    login:(state,action)=>{
      state.loading=true;
    },
    loginSuccess: (state,action) => {
      state.loading=false;
      state.isAuthenticated = true;
      state.message=""
    },
    loginFailed: (state) => {
      state.loading=false;
      state.isAuthenticated = false;
      state.message = "Invalid credentials"
    },
    logout: (state) => {
      state.loading=false;
      state.isAuthenticated = false;
    },
  },
});

//Actions
export const authActions = authSlice.actions;

//export reducer
const authReducer = authSlice.reducer;
export default authReducer;
