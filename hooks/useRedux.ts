import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import {AppDispatch, RootState} from 'store';

// the following lines are taken from official redux documentation for TS https://redux.js.org/recipes/usage-with-typescript#define-typed-hooks
/**
 * Thunk aware dispatch. Default useDispatch doesn't know about middlewares
 **/
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
