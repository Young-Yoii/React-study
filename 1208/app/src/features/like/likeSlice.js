import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    count:0
}

const slice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
      up: (state, action) => {
        state.count += 1; //reducer함수
      },
    },
  })

export default slice;
export const {up} = slice.actions;
//createSlice에게 reducer 함수를 주면 동명의 action creator를 자동으로 만들어줌.
//reducer함수의 up을 diapatch에서 up()으로 사용할 수 있도록 함.