import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Category } from '../../type';

export const fetchCategories = createAsyncThunk<Category[]>('categories/fetch', async () => {
  const categories = await axiosApi.get<Category[]>('/categories');
  return categories.data;
});
