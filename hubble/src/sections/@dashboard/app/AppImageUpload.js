// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';

// utils
import { useEffect, useRef, useState } from 'react';
import Dropzone from 'react-dropzone';

import {
  Grid,
  Container,
  Typography,
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  Input,
  Card,
  TextField,
  ButtonBase,
  Box,
  CircularProgress,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from 'react-redux';
import { Prediction } from '../../../store/actions/prediction';
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

const StyledButtonBase = styled(ButtonBase)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  position: 'relative',
  '& input': {
    display: 'none',
  },
  '& img': {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    top: 0,
    left: 0,
  },
  '& span': {
    position: 'absolute',
    zIndex: 1,
  },
});
// ----------------------------------------------------------------------

const AppImageUpload = ({ title, total, icon, color = 'primary', sx, ...other }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const loading = useSelector((state) => state.prediction.loading);
  const predictResult = useSelector((state) => state.prediction.predResult);
  const userid = useSelector((state) => state.user.user._id);
  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleFileSelect = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    console.log(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleFileUpload = (event) => {
    event.preventDefault();
    dispatch(Prediction(file, userid));
  };
  const handleFileClear = () => {
    setFile(null);
    setPreview(null);

    dispatch({ type: 'clearPrediction' });
  };
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      {!preview ? (
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Dropzone onDrop={handleFileSelect} multiple={false}>
            {({ getRootProps, getInputProps }) => (
              <Box
                {...getRootProps()}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderStyle: 'dashed',
                  borderWidth: 2,
                  borderRadius: 2,
                  borderColor: 'grey.500',
                  p: 4,
                  m: 2,
                  backgroundColor: '#fafafa',
                  color: 'text.secondary',
                  transition: 'border .24s ease-in-out',
                  ':hover': {
                    borderColor: 'primary.main',
                  },
                }}
              >
                <input {...getInputProps()} />
                <Typography variant="h5" sx={{ mt: 3 }}>
                  Drag and drop an image here, or click to select an image.
                </Typography>
                <CloudUploadIcon sx={{ fontSize: 72, mt: 3 }} />
              </Box>
            )}
          </Dropzone>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderStyle: 'dashed',
              borderWidth: 2,
              borderRadius: 2,
              borderColor: 'grey.500',
              p: 4,
              m: 2,
              backgroundColor: '#fafafa',
              transition: 'border .24s ease-in-out',
              ':hover': {
                borderColor: 'primary.main',
              },
            }}
          >
            {preview && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '200px',
                  marginTop: '16px',
                  position: 'relative',
                }}
              >
                <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                {loading && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      bgcolor: 'rgba(255, 255, 255, 0.5)',
                      zIndex: 1,
                    }}
                  >
                    <CircularProgress />
                  </Box>
                )}
                {/* {!loading && predictResult && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 1,
                    }}
                  >
                    <Typography>{predictResult.result}</Typography>
                    <br />
                    <Typography>{predictResult.probability}</Typography>
                  </Box>
                )} */}
              </Box>
            )}
            {!loading && predictResult && (
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'block',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 2,
                }}
              >
                <Typography>Result : {predictResult.result}</Typography>
                <Typography>Probability : {predictResult.probability}</Typography>
              </Box>
            )}
            {preview && (
              <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 5 }}>
                <Button variant="contained" color="primary" onClick={handleFileUpload} disabled={!preview}>
                  Upload
                </Button>
                <Button variant="outlined" color="primary" onClick={handleFileClear} disabled={!preview}>
                  Clear
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default AppImageUpload;
AppImageUpload.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,

  sx: PropTypes.object,
};
