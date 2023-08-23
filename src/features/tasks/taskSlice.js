import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  data: [],
  success:false
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    getTasks(state) {
      state.loading = true;
    },
    getTasksSuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.data = action.payload
    },
    getTasksFailed(state, action) {
      state.loading = false;
      state.success = false;
    },
    
    addTask(state, action) {
      state.loading = true;
    },
    addTaskSuccess(state,action){
      state.loading = false;
      state.success = true;
      state.data = action.payload
    },
    addTaskFailed(state,){
      state.loading = false;
      state.success = false;
    },

    updateTask(state,action) {
      state.loading = false;
    },
    updateTaskSuccess(state, action) {
      state.loading = false;
      state.success = true;
    },
    updateTaskFailed(state, action) {
      state.loading = false;
      state.success = false;
    },

    deleteTask(state,action) {
      state.loading = true;
    },
    deleteTaskSuccess(state, action) {
      state.loading = false;
      state.success = true;
    },
    deleteTaskFailed(state, action) {
      state.loading = false;
      state.success = false;
    },
    clearData(state){
      state.loading = false;
      state.success = false;
    }
  },
});

//Actions
export const taskActions = taskSlice.actions;

//export reducer
const taskReducer = taskSlice.reducer;
export default taskReducer;