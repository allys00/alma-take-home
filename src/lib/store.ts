import { authReducer } from '@/reducer/auth/authSlice'
import { leadsReducer } from '@/reducer/leads/leadsSlice'
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const makeStore = () => {
    return configureStore({
        reducer: {
            leads: leadsReducer,
            auth: authReducer
        },

        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({ serializableCheck: false })
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;