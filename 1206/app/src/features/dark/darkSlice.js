import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isDark:false
}
//slice는 서로 연관된 state와 reducer의 그룹이다.
//slice를 사용한다면..
//1. 리듀서함수를 정의하면 함수를 실행할 수 있는 action creater 가 자동으로 실행된다.
//2. 만약 슬라이스를 쓰지 않는다면 직접 액션을 따로 만들어야 한다.
//3. 대박이다.

const slice = createSlice({
    name: 'darkmode',
    initialState,
    reducers: {
      change: (state, action) => {
        state.isDark = action.payload;
      },
      toDark: (state, action) => {
        state.isDark = true;
      },
      toLight: (state, action) => {
        state.isDark = false;
      },
      toggle: (state, action) => {
        state.isDark = !state.isDark;
      }

    },
  })

export default slice;

//권장방법

//export const {change} = slice.actions //slice 중 특정 reducer만 export
//export default slice; 도 함께 써줘야함.
//받아오는 곳에서는 import {change} from ... 으로!