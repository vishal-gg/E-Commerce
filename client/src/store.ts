import {configureStore} from '@reduxjs/toolkit'
import fetchProductReducer from './features/getProducts'
import cartReducer from './features/cartSlice'
import authReducter from './features/authSlice'

 const store = configureStore({
    reducer: {
        Products: fetchProductReducer,
        Cart: cartReducer,
        Authentication: authReducter
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch