import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Grid, MenuItem, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { ProductMutation } from '../../../type';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createProduct } from '../productsThunk';
import { selectProductCreating } from '../productsSlice';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { fetchCategories } from '../../categories/categoriesThunk';
import { selectCategories, selectCategoriesLoading } from '../../categories/categoriesSlice';

const ProductForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectProductCreating);
  const categories = useAppSelector(selectCategories);
  const categoriesLoading = useAppSelector(selectCategoriesLoading);

  const [state, setState] = useState<ProductMutation>({
    category: '',
    title: '',
    price: '',
    description: '',
    image: null,
  });

  useEffect(() => {
    dispatch(fetchCategories());
  },[dispatch]);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(createProduct(state)).unwrap();
      navigate('/');
    } catch (e) {
      alert('Invalid field');
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const files = e.target.files;

    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return !categoriesLoading ? (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={2}>

        <Grid item xs>
          <TextField
            select
            id="category" label="Category"
            value={state.category}
            onChange={inputChangeHandler}
            name="category"
            required
          >
            <MenuItem value="" disabled>Please select a category</MenuItem>
            {categories.map(category => (
              <MenuItem
                key={category._id}
                value={category._id}
              >
                {category.title}
              </MenuItem>
            ))}

          </TextField>

        </Grid>

        <Grid item xs>
          <TextField
            id="title" label="Title"
            value={state.title}
            onChange={inputChangeHandler}
            name="title"
          />
        </Grid>

        <Grid item xs>
          <TextField
            id="price" label="Price"
            value={state.price}
            onChange={inputChangeHandler}
            name="price"
          />
        </Grid>

        <Grid item xs>
          <TextField
            multiline rows={3}
            id="description" label="Description"
            value={state.description}
            onChange={inputChangeHandler}
            name="description"
          />
        </Grid>

        <Grid item xs>
          <FileInput
            onChange={filesInputChangeHandler}
            name="image"
            label="image"
          />
        </Grid>

        <Grid item xs>
          <LoadingButton
            type="submit"
            size="small"
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            <span>Send</span>
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  ) : <CircularProgress />;
};

export default ProductForm;