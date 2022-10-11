/*
 *
 * Interview Slice
 *
 */
import { createSlice } from 'utils/@reduxjs/toolkit';
import { interviewSaga } from './saga';
import { InterviewState } from './types';

export const initialState: InterviewState = {
  users: [],
  loading: false,
  success: false,
  failures: false,
};

const slice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    get(state) {
      state.loading = true;
      state.success = false;
      state.failures = false;
    },
    getSucceed(state, actions) {
      state.users = actions.payload;
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    getFailed(state) {
      state.loading = false;
      state.success = false;
      state.failures = true;
    },
    interview(state, actions) {
      state.loading = true;
      state.success = false;
      state.failures = false;
    },
    interviewSucceed(state) {
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    interviewFailed(state) {
      state.loading = false;
      state.success = false;
      state.failures = true;
    },
  },
});

export const { actions } = slice;

export const interviewSlice = { key: slice.name, reducer: slice.reducer, saga: interviewSaga };
