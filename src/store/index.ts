import { configureStore } from '@reduxjs/toolkit';
import mealReducer from './slice/mealSlice.ts'
import {mealApi} from "./api/mealApi.ts";
const store = configureStore({
    reducer: {
        meals: mealReducer,
        [mealApi.reducerPath]: mealApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mealApi.middleware),
});

export default store;
