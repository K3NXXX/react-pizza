import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from "axios";
import { CartItem } from './cartSlice';

export type Pizza = CartItem

interface PizzaSliceState {
  items: Pizza[];
}
type FetchPizzasArgs = Record<string, string>
export const fetchPizzas = createAsyncThunk<Pizza[], Record<string,string>>(
  'pizza/fetchPizzasStatus',
  async (params: FetchPizzasArgs) => {
    const {category,search,currentPage} = params
    const res = await axios.get<Pizza[]>(`https://64b38b820efb99d86267e6a2.mockapi.io/items?page=${currentPage}&limit=4&${category}${search}`)
    return res.data 
  }
)
const initialState: PizzaSliceState = {
    items: [],
  
};
const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action:PayloadAction<Pizza[]>) {
        state.items = action.payload
      },
  },
  extraReducers: (builder) =>{
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
    })
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.items = []
    })
  }
});


export const {setItems} = pizzasSlice.actions;

export default pizzasSlice.reducer;