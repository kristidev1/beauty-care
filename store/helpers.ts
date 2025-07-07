import {createAsyncThunk} from '@reduxjs/toolkit';

import {rootReducer, store} from './index';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export type ThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue?: unknown;
};

/// function used to make API calls using toolkit
export const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkConfig>();
