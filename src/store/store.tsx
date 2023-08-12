import musicApi from "../api/music";
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    [musicApi.reducerPath]: musicApi.reducer
})
const middleReducer = [musicApi.middleware]
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware({}).concat(...middleReducer)
})