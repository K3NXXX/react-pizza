import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";


export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const {category,search,currentPage} = params
    const res = await axios.get(`https://64b38b820efb99d86267e6a2.mockapi.io/items?page=${currentPage}&limit=4&${category}${search}`)
    return res.data
  }
)
const initialState = {
    items: [],
  
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
        state.items = action.payload
      },
  },
  extraReducers:{
    [fetchPizzas.pending]: (state,action) => {
      console.log(state, "Pending")
    },
    [fetchPizzas.fulfilled]: (state,action) => {
      console.log(state, "OK")
    },
    [fetchPizzas.rejected]: (state,action) => {
      console.log(state, "rejected")
    },

  }
});


export const {setItems} = pizzasSlice.actions;

export default pizzasSlice.reducer;