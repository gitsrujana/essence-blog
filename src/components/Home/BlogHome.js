import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BlogComponentPage from '../../pages/BlogComponentPage';


const BlogHome = () => {
  const mediaViewPort=useMediaQuery("(min-width:600px)")
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handlePost = (e) => {
    e.preventDefault();
    if (title && content && image) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('image', image);


      // Reset the form after submission
      setTitle('');
      setContent('');
      setImage(null);
      setImagePreview('');
      setSnackbarOpen(true);
    } else {
      alert('Please fill in all fields and upload an image');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
    <Container>
      <Typography variant="h6" component="h6" gutterBottom sx={{marginTop:mediaViewPort?"10%":"15%",textAlign:"start"}}>
        Create a  Post
      </Typography>
      <form onSubmit={handlePost}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          sx={{width:mediaViewPort?"50%":"100%"}}
        /><br/>
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          sx={{width:mediaViewPort?"50%":"100%"}}
        /><br/>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id="image-upload"
          required
        />
        <label htmlFor="image-upload">
          <Button variant="contained" component="span" sx={{
            backgroundColor:"white",
            color:"black",
            marginTop:"2%",
            textTransform:"none"
            }}>
            Upload Image
          </Button>
        </label>
        {imagePreview && (
          <Box mt={2}>
            <Typography variant="h6">Image Preview:</Typography>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: '200px', height: 'auto', marginTop: '15px' }}
            />
          </Box>
        )}
     <Button variant="contained" color="primary" type="submit" sx={{
        backgroundColor:"white",
        color:"black",
        marginTop:"2%",
        marginLeft:"2%",
        textTransform:"none"
        }}>
          Post
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          Post submitted successfully!
        </Alert>
      </Snackbar>
      
    </Container>
    <BlogComponentPage/>
    </Box>
  );
};

export default BlogHome;
