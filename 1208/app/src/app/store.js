import { configureStore } from '@reduxjs/toolkit'
import darkSlice from '../features/dark/darkSlice'
import likeSlice from '../features/like/likeSlice'
import {topicApi} from './api';

//store은 state, reducer, dispatch를 가지고 있다.
//configureStore에 reducer를 공급해준다.

export const store = configureStore({
  reducer: {
    [darkSlice.name]:darkSlice.reducer,
    [likeSlice.name]:likeSlice.reducer,
    [topicApi.reducerPath]:topicApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(topicApi.middleware),
})