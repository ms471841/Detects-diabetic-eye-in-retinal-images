import { Helmet } from "react-helmet-async";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";

// components
import { useEffect } from "react";
import AppImageUpload from "../sections/@dashboard/app/AppImageUpload";
import { AppWidgetSummary } from "../sections/@dashboard/app";
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  let userHistory = useSelector((state) => state.user.user.images);
  if (userHistory.length > 4) {
    userHistory = userHistory.slice(0, 4);
  }

  const frequencies = {};
  const countFrequency = (data) => {
    data.forEach((item) => {
      const result = item.result;

      if (frequencies[result]) {
        frequencies[result]++;
      } else {
        frequencies[result] = 1;
      }
    });

    // Initialize frequencies with zero for missing values
    const uniqueValues = [...new Set(data.map((item) => item.result))];
    uniqueValues.forEach((value) => {
      if (!frequencies[value]) {
        frequencies[value] = 0;
      }
    });
  };
  useEffect(() => {
    countFrequency(userHistory);
  });
  console.log(frequencies.No_DR);
  return (
    <>
      <Helmet>
        <title> Dashboard | Hubble</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
        <Grid item xs={12} sm={12} md={12}>
          <AppImageUpload
            title={"Upload Image"}
            color="info"
            icon={"ant-design:android-filled"}
          />
        </Grid>
        <Typography variant="h4" sx={{ mb: 5, mt: 5 }}>
          Previous Result
        </Typography>
        <Grid container spacing={3}>
          {userHistory != null &&
            userHistory.map((image, index) => (
              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title={image.result}
                  probability={image.probability}
                  url={image.url}
                />
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
}
