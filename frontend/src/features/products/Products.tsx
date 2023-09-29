import React, { useEffect } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from './productsThunk';
import { selectProducts } from './productsSlice';
import ProductItem from './components/ProductItem';
import { selectUser } from '../users/usersSlice';
import { userRoles } from '../../constants';

const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Products</Typography>
        </Grid>

        <Grid item>
          {user && user.role === userRoles.admin && (
            <Button color="primary" component={Link} to="/products/new">
              Add product
            </Button>
          )}
        </Grid>
      </Grid>

      <Grid container item spacing={2}>
        {products.map((product) => (
          <ProductItem
            key={product._id}
            id={product._id}
            title={product.title}
            price={product.price}
            image={product.image}
            category={product.category}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default Products;
