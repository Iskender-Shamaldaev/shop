import React from 'react';
import { Container, Typography } from '@mui/material';
import ProductForm from './components/ProductForm';

const NewProduct = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mb: 3 }}>
        New product
      </Typography>
      <ProductForm />
    </Container>
  );
};

export default NewProduct;
