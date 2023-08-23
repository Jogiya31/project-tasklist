
import { call, put, takeLatest } from "redux-saga/effects";
import { taskActions } from "./taskSlice";
import { addTaskApi, deleteTaskApi, getTasksApi, updateTaskApi } from "../../api/api";

//get all tasks
  function* watchGetTask() {
    try {
      const response = yield call(getTasksApi);
      if (response.status===200) {
        const data = response.data;
        yield put(taskActions.getTasksSuccess(data));
      }
      else{
        throw new Error("Somthing went wrong")
      }
    } catch (error) {
      console.log(error );
      yield put(taskActions.getTasksFailed(error));
    }
  }
//add new tasks
  function* watchAddTask(payload) {
    try {
      const response = yield call(addTaskApi,payload);
      if (response.status===201) {
        const data = response.data;
        yield put(taskActions.addTaskSuccess(data));
      }
      else {
        throw new Error("Somthing went wrong")
      }
    } catch (error) {
      console.log(error)
      yield put(taskActions.addTaskFailed(error));
    }
  }

  // update tasks
  function* watchUpdateTask(payload) {
    try {
      const response = yield call(updateTaskApi,payload);
      if (response.status===200) {
        const data = response.data;
        yield put(taskActions.updateTaskSuccess(data));
      }
      else{
        throw new Error("Somthing went wrong")
      }
    } catch (error) {
      console.log(error)
      yield put(taskActions.updateTaskFailed(error));
    }
  }

    // delete tasks
  function* watchDeleteTask(payload) {
    try {
      const response = yield call(deleteTaskApi,payload);
      if (response.status===200) {
        const data = response.data;
        yield put(taskActions.deleteTaskSuccess(data));
      }
      else {
        throw new Error("Somthing went wrong")
      }
    } catch (error) {
      console.log(error)
      yield put(taskActions.deleteTaskFailed(error));
    }
  }

  export default function* taskSaga() {
    yield takeLatest(taskActions.getTasks.type, watchGetTask);
    yield takeLatest(taskActions.addTask.type, watchAddTask);
    yield takeLatest(taskActions.updateTask.type, watchUpdateTask);
    yield takeLatest(taskActions.deleteTask.type, watchDeleteTask);
  }