import { combineReducers, configureStore } from "@reduxjs/toolkit";
import currencyReducer from './reducers/currencySlice';

const rootReducer = combineReducers({
    currencyReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
}
export const store = setupStore();
// store.subscribe(() => {
//     localStorage.setItem('reduxState', JSON.stringify(store.getState().currencyReducer))
// });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];