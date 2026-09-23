import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import socketReducer from './slices/socketSlice';
import chatReducer from './slices/chatSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        socket: socketReducer,
        chat: chatReducer,
    },
});
