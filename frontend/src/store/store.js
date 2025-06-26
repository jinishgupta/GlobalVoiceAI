import { configureStore } from "@reduxjs/toolkit";
import ttsReducer from "./ttsSlice";
import translateReducer from "./translateSlice";
import authReducer from "./authSlice";
import dubbingReducer from "./dubbingSlice";

const store = configureStore({
  reducer: {
    auth:authReducer,
    tts: ttsReducer,
    translate: translateReducer,
    dubbing: dubbingReducer,
  },
});

export default store;