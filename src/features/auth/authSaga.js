/* eslint-disable react-hooks/rules-of-hooks */
import { put, takeLatest } from "redux-saga/effects";
import { call } from "redux-saga/effects";
import { authActions } from "./authSlice";
import { loginApi } from "../../api/api";

// login user
function* handleLogin(data) {
  try {
    const response = yield call(loginApi, data.payload);
    const loginData = response.data[0];
    if (loginData) {
      yield put(authActions.loginSuccess());
      sessionStorage.setItem("loggedIn",true);
    } else{
      yield put(authActions.loginFailed());
    }
  } catch (error) {
    yield put(authActions.loginFailed(error));
  }
}

export default function* authSaga() {
  yield takeLatest(authActions.login.type, handleLogin);
}
