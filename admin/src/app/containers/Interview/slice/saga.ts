/*
 *
 * Interview Saga
 *
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { actions } from '.';
import { actions as snackbarActions } from 'app/containers/Dashboard/slice';

export function* get() {
  try {
    const { response } = yield call(request, {
      url: '/play',
      method: 'GET',
    });
    if (response) {
      yield put(actions.getSucceed(response.data));
    } else {
      yield put(actions.getFailed());
      yield put(
        snackbarActions.openSnackbar({
          message: 'Lấy dữ liệu thất bại',
          variant: 'error',
        }),
      );
    }
  } catch (failed) {
    yield put(actions.getFailed());
    yield put(
      snackbarActions.openSnackbar({
        message: 'Lấy dữ liệu thất bại',
        variant: 'error',
      }),
    );
  }
}
export function* interview(payload) {
  try {
    const { response } = yield call(request, {
      url: `/play/interview/${payload.payload._id}`,
      method: 'POST',
      data: payload.payload,
    });
    if (response) {
      yield put(actions.interviewSucceed());
      yield put(actions.get());
      yield put(
        snackbarActions.openSnackbar({
          message: 'Phỏng vấn thành công',
          variant: 'success',
        }),
      );
    } else {
      yield put(actions.interviewFailed());
      yield put(
        snackbarActions.openSnackbar({
          message: 'Lấy dữ liệu thất bại',
          variant: 'error',
        }),
      );
    }
  } catch (failed) {
    yield put(actions.interviewFailed());
    yield put(
      snackbarActions.openSnackbar({
        message: 'Lấy dữ liệu thất bại',
        variant: 'error',
      }),
    );
  }
}
export function* interviewSaga() {
  yield takeLatest(actions.get.type, get);
  yield takeLatest(actions.interview.type, interview);
}
