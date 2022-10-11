/*
 *
 * Interview Selector
 *
 */
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types/RootState';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.interview || initialState;

export const selectInterview = createSelector(selectSlice, state => state);
