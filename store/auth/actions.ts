import {createAction} from '@reduxjs/toolkit';

import {User} from 'models';

export const setAccessToken = createAction<string>('setAccessToken');
export const setUser = createAction<User>('setUser');
