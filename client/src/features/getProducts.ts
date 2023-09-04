import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {stateType} from '../types/productType'

const initialState: stateType = {
    loading: false,
    products: null,
    error: ''
}

export const fetchProducts = createAsyncThunk(
    'fetchProducts',
    async () => {
        try {
            const {data} = await axios.get('https://e-commerce-serverside.vercel.app/get')
            return data
        } catch (err:any) {
            throw new Error(err.response.data.error || 'something went wrong')
        }
    }
)

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.products = null;
            state.error = action.error.message || 'something went wrong'
        })
    }
})

export default productSlice.reducer