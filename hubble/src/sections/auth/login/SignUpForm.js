import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useDispatch, useSelector } from 'react-redux';
import { CreateUser, Login } from '../../../store/actions/user';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function SignUpForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error, user } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  }); 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Pass formData to backend using fetch or axios
    console.log(formData);
    dispatch(CreateUser(formData));
  };

  useEffect(() => {
    // if (error) {
    //   toast.error(error);
    //   dispatch(clearErrors());
    // }
    if (isAuthenticated) {
      navigate(`/dashboard`, { replace: true });
    }
  }, [dispatch, error, isAuthenticated, navigate]);
  return (
    <>
      <Stack spacing={3}>
        <TextField name="name" label="Name" value={formData.name} onChange={handleInputChange} />

        <TextField name="email" label="Email address" value={formData.email} onChange={handleInputChange} />

        <TextField
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleInputChange}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
      
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleSubmit}>
        Sign Up
      </LoadingButton>
    </>
  );
}
