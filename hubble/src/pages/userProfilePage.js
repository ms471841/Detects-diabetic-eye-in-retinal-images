import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { gridSpacing } from 'store/constant';
import {
  Grid,
  InputLabel,
  TextField,
  Chip,
  Autocomplete,
  Typography,
  Divider,
  CardMedia,
  CardContent,
  Card,
  Avatar,
  Box,
  Container,
} from "@mui/material";
// import MainCard from 'ui-component/cards/MainCard';
// import AnimateButton from 'ui-component/extended/AnimateButton';
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { Helmet } from "react-helmet-async";
import { UpdateProfile } from "../store/actions/user";

const Personal = () => {
  const user = useSelector((state) => state.user.user);
  const gridSpacing = 4;
  const id = user._id;
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: user.name ? user.name : "",
    designation: user.designation ? user.designation : "",
    dob: user.dob ? user.dob : "",
    email: user.email ? user.email : "",
    role: user.role ? user.role : "",
    phonenumber: user.phonenumber ? user.phonenumber : "",
    address: user.address ? user.address : "",
    country: user.country ? user.country : "",
    aboutme: user.aboutme ? user.aboutme : "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  // Handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(UpdateProfile(id, formData));
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Profile | Hubble </title>
      </Helmet>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Profile
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Typography gutterBottom>Name</Typography>

                  <TextField
                    placeholder="Name"
                    variant="outlined"
                    fullWidth
                    name="name"
                    size="small"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Typography gutterBottom>Email</Typography>

                  <TextField
                    disabled
                    helperText="You can't change email here."
                    placeholder="Email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    size="small"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Typography gutterBottom>Designation</Typography>

                  <TextField
                    disabled
                    helperText="You are't allowed to change"
                    placeholder="Role"
                    variant="outlined"
                    fullWidth
                    name="role"
                    size="small"
                    value={formData.role}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography gutterBottom>Date of Birth (dd/mm/yy)</Typography>

                  <TextField
                    placeholder="Date of Birth (dd/mm/yy)"
                    variant="outlined"
                    fullWidth
                    name="dob"
                    size="small"
                    value={formData.dob}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography gutterBottom>Phone</Typography>

                  <TextField
                    placeholder="Phone Number"
                    variant="outlined"
                    fullWidth
                    name="phonenumber"
                    size="small"
                    value={formData.phonenumber}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Typography gutterBottom>Address</Typography>

                  <TextField
                    placeholder="Address"
                    variant="outlined"
                    fullWidth
                    multiline
                    minRows={1}
                    maxRows={3}
                    name="address"
                    size="small"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Typography gutterBottom>Country</Typography>

                  <TextField
                    placeholder="Country"
                    variant="outlined"
                    fullWidth
                    name="country"
                    size="small"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography gutterBottom>About</Typography>
                  <Divider />
                  <br />
                  <TextField
                    placeholder="Type Something"
                    variant="outlined"
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    name="aboutme"
                    size="small"
                    value={formData.aboutme}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  {/* <AnimateButton> */}
                  <LoadingButton
                    disableElevation
                    fullWidth
                    size="large"
                    type="submit"
                    endIcon={<SendIcon />}
                    // loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    color="secondary"
                  >
                    <span> Update</span>
                  </LoadingButton>
                  {/* </AnimateButton> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default Personal;
