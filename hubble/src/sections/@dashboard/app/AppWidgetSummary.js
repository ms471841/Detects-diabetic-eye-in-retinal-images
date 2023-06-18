// @mui
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Box, Card, CardMedia, Stack, Typography } from "@mui/material";
// utils

import { Link } from "react-router-dom";

// ----------------------------------------------------------------------

const StyledProductImg = styled("img")({
  top: 0,
  width: "100%",
  height: "`100%",
  objectFit: "cover",
  position: "absolute",
  margin: "auto",
  display: "flex",

  alignItems: "center",

  justifyContent: "center",
});

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  url: PropTypes.string,
  title: PropTypes.string.isRequired,
  probability: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({
  title,
  probability,
  url,
  color = "primary",
  sx,
  ...other
}) {
  return (
    <Card
      elevation={10}
      sx={{
        margin: 2,
        "&:hover": {
          transform: "scale(1.1)",
          transition: "all 0.2s ease-in-out",
        },
      }}
    >
      <Box sx={{ pt: "100%", position: "relative" }}>
        <StyledProductImg alt={title} src={url} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            Result: {title}
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
