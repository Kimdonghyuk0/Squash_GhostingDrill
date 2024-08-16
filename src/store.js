import { configureStore, createSlice } from '@reduxjs/toolkit';

// bgm 슬라이스 정의
const bgm = createSlice({
  name: 'bgm',
  initialState: true,
  reducers: {
    // bgm 상태를 토글하는 액션
    toggleBgm: (state) => !state,
  },
});

// 슬라이스에서 액션 생성자와 리듀서 추출
export let { toggleBgm } = bgm.actions;

// 스토어 구성
export default configureStore({
  reducer: {
    bgm: bgm.reducer,
  },
});
