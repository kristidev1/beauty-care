import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {User} from 'models';

import {RootState} from '../helpers';
import {setAccessToken, setUser} from './actions';
import {AuthReducer} from './types';

const initialState: AuthReducer = {
  token: undefined,
  user: undefined,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setAccessToken.type, (state, action: PayloadAction<string>) => {
        state.token = action.payload;
      })
      .addCase(setUser.type, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      });
  },
});

export {setAccessToken, setUser};

export const authSelector = (state: RootState): AuthReducer => state.auth;

export const {reducer: authReducer} = authSlice;
