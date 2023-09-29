import { Category } from '../../type';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchCategories } from './categoriesThunk';

interface CategoriesState {
  items: Category[],
  loading: boolean,
}

export const initialState: CategoriesState = {
  items: [],
  loading: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.items = payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
      })
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const selectCategories = (state: RootState) => state.categories.items;
export const selectCategoriesLoading = (state: RootState) => state.categories.loading;
