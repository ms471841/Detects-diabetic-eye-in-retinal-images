import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ histories, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {histories.map((history) => (
        <Grid item xs={12} sm={6} md={3}>
          <ShopProductCard history={history} />
        </Grid>
      ))}
    </Grid>
  );
}
