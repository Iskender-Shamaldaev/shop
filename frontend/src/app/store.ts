import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {usersReducer} from '../features/users/usersSlice';
import {productsReducer} from '../features/products/productsSlice';
import {categoriesReducer} from '../features/categories/categoriesSlice';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";

const usersPersistConfig = {
    key: 'shop:users',
    storage,
    whitelist: ['user'],
};

const rootReducer = combineReducers({
    products: productsReducer,
    categories: categoriesReducer,
    users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persister = persistStore(store);