'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
}

const initialState: AuthState = {
    token: typeof window !== "undefined" ? localStorage.getItem('token') : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        logout: (state) => {
            state.token = null;
            localStorage.removeItem('token');
        },
    },
});

export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;