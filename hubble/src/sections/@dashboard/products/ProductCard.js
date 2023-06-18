import PropTypes from "prop-types";
// @mui
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
import { fCurrency } from "../../../utils/formatNumber";
// components
import Label from "../../../components/label";
import { ColorPreview } from "../../../components/color-utils";

// ----------------------------------------------------------------------

const StyledProductImg = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  // product: PropTypes.object,
  history: PropTypes.object,
};

export default function ShopProductCard({ history }) {
  // Fconst { name, cover, price, colors, status, priceSale } = product;
  const { result, probability, url } = history;
  console.log(url);
  return (
    <Card
      sx={{
        margin: 2,
        "&:hover": {
          transform: "scale(1.1)",
          transition: "all 0.2s ease-in-out",
        },
      }}
    >
      <Box sx={{ pt: "100%", position: "relative" }}>
        <StyledProductImg alt={result} src={url} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            Result: {result}
          </Typography>
        </Link>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1">
            &nbsp; probability:
            {probability}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
