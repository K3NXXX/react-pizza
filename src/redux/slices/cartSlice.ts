import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getCardFromLS } from '../../utils/getCardFromLS';
const localStorageTotalPrice = localStorage.getItem("totalPrice");
const totalPriceFromLocalStorage = localStorageTotalPrice ? JSON.parse(localStorageTotalPrice) : 0;

export type CartItem = {
    id: string;
    title: string;
    price:number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
}
interface CartSliceState {
    totalPrice: number;
    items: CartItem[],
    count: number;

}
const initialState: CartSliceState = {
    totalPrice: totalPriceFromLocalStorage,
    items: getCardFromLS(),
    count: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  
    addItem(state, action:PayloadAction<CartItem>) {
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
    removeItem(state, action: PayloadAction<string>) {
    const removedItem = state.items.find(obj => obj.id === action.payload);
    if(removedItem) {
        state.items = state.items.filter(obj => obj.id !== action.payload)
        state.totalPrice -= removedItem.price * removedItem.count;
    }
    },
    minusItem(state,action:PayloadAction<string>){
        const findItem = state.items.find(obj => obj.id === action.payload)
        if (findItem) {
            if (findItem.count > 0) {
                findItem.count--;
                state.totalPrice -= findItem.price;
            }
        }
    },
    clearItem(state) {
    state.items = []
    state.totalPrice = 0
    },
  
    
   
  },
});


export const {addItem,removeItem, minusItem,clearItem} = cartSlice.actions;

export default cartSlice.reducer;