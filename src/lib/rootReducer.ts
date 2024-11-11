import { combineReducers } from "@reduxjs/toolkit";
import layoutReducer from './slices/layoutSlice'
import logReducer from './slices/logSlice'
import timestampReducer from './slices/timestampSlice'

export const rootReducer = combineReducers({
  layout: layoutReducer,
  logs: logReducer,
  timestamps: timestampReducer,
})