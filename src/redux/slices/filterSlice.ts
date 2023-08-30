import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type FilterSliceState = {
  searchValue: string;
  categoryId: number;
  currentPage: number;
}
const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,

};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action:PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setPageCount(state,action:PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action:PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length){
        state.currentPage = Number(action.payload.currentPage)
        state.categoryId = Number(action.payload.categoryId)
      }else {
        state.currentPage = 1;
        state.categoryId = 0;
      }
    },
    setSearchValue(state,action:PayloadAction<string>) {
      state.searchValue = action.payload
    }

  },
});


export const { setCategoryId, setPageCount, setFilters, setSearchValue} = filterSlice.actions;

export default filterSlice.reducer;