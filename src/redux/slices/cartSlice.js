import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    totalPrice: JSON.parse(localStorage.getItem("totalPrice")) || 0,
    items: JSON.parse(localStorage.getItem("cart")) || [],
    count: 0
  
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  
    addItem(state, action) {
        const findItem = state.items.find(obj => obj.id === action.payload.id)
        if (findItem) {
            findItem.count++
        }else {
            state.items.push({
                ...action.payload,
                count: 1
            })
        }
        state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum
              }, 0)
      },
    removeItem(state, action) {
    state.items = state.items.filter(obj => obj.id !== action.payload)
    },
    minusItem(state,action){
        const findItem = state.items.find(obj => obj.id === action.payload)
        if (findItem) {
            findItem.count--
        }
    },
    clearItem(state, action) {
    state.items = []
    state.totalPrice = 0
    },
  
    
   
  },
});


export const { setCategoryId,addItem,removeItem, minusItem,clearItem} = cartSlice.actions;

export default cartSlice.reducer;