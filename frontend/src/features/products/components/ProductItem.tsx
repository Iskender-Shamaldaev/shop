import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  styled,
  Typography,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link as Navlink } from 'react-router-dom';
import imageNotAvailable from '../../../assets/images/imageNotAvailable.png';
import { apiUrl } from '../../../constants';
import { Category } from '../../../type';

const Link = styled(Navlink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

interface Props {
  id: string;
  title: string;
  price: number;
  image: string | null;
  category: Category;
}

const ProductItem: React.FC<Props> = ({ id, category, title, price, image }) => {
  let productImage = imageNotAvailable;

  if (image) {
    productImage = apiUrl + '/' + image;
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} component={Link} to={'/products/' + id}>
      <Card>
        <CardActionArea>
          <CardMedia sx={{ height: '200px' }} image={productImage} title={title} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography>
              <strong>
                <span style={{ marginRight: '5px' }}>Category:</span>{' '}
                {category?.title ? category.title : 'Other'}
              </strong>
            </Typography>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography variant="h6" color="text.secondary">
                <strong>Price: {price}</strong>
              </Typography>
              <ArrowForwardIosIcon />
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ProductItem;
