import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    count:0
}

const slice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
      up: (state, action) => {
        state.count += 1;
      },
    },
  })

export default slice;
export const {up} = slice.actions;