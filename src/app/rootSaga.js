import { all } from 'redux-saga/effects';
import taskSaga from '../features/tasks/taskSaga';
import authSaga from '../features/auth/authSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    taskSaga()
  ]);
}
