/*
 *
 * UserPage Selector
 *
 */
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types/RootState';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.userPage || initialState;

export const selectUserPage = createSelector(selectSlice, state => state);
