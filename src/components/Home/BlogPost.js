import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Stack,
  Typography,
  Box,
  Snackbar,
  Alert,
  IconButton,
  useMediaQuery,
  CircularProgress,
  
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MessageIcon from '@mui/icons-material/Message';
import RedoIcon from '@mui/icons-material/Redo';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const BlogPost = () => {
  const mediaViewPort = useMediaQuery('(min-width:600px)');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);

  // Fetch posts from localStorage on component mount
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts'));
    if (storedPosts) {
      setPosts(storedPosts);
    }
    setLoading(false);
  }, []);

  // Handle post submission for both create and edit
  const handlePost = (e) => {
    e.preventDefault();

    const newPostData = {
      title,
      body: content,
      image: imagePreview,
      id: Date.now(), // Unique ID
    };

    if (editMode) {
      // Update the post
      const updatedPosts = posts.map((post) =>
        post.id === currentPostId ? { ...newPostData, id: currentPostId } : post
      );
      setPosts(updatedPosts);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      setSnackbarOpen(true);
      resetForm();
    } else {
      // Create a new post
      const updatedPosts = [newPostData, ...posts];
      setPosts(updatedPosts);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      setSnackbarOpen(true);
      resetForm();
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

  const handleEdit = (postId) => {
    const postToEdit = posts.find((post) => post.id === postId);
    setTitle(postToEdit.title);
    setContent(postToEdit.body);
    setImagePreview(postToEdit.image);
    setEditMode(true);
    setCurrentPostId(postId);
  };

  const handleDelete = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setImage(null);
    setImagePreview('');
    setEditMode(false);
    setCurrentPostId(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
 
  return (
    <Box>
      <Container>
        <Typography
          variant="h6"
          component="h6"
          gutterBottom
          sx={{ marginTop: mediaViewPort ? '10%' : '15%', textAlign: 'start' }}
        >
          {editMode ? 'Edit Post' : 'Create a Post'}
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
            sx={{width:"50%"}}
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
            sx={{width:"50%"}}
          /><br/>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Button
              variant="contained"
              component="span"
              sx={{
                backgroundColor: 'white',
                color: 'black',
                marginTop: '2%',
                textTransform: 'none',
              }}
            >
              {editMode ? 'Change Image' : 'Upload Image'}
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              backgroundColor: 'white',
              color: 'black',
              marginTop: '2%',
              marginLeft: '2%',
              textTransform: 'none',
            }}
          >
            {editMode ? 'Update Post' : 'Post'}
          </Button>
          {editMode && (
            <Button
              variant="contained"
              sx={{
                marginLeft: '10px',
                backgroundColor: 'gray',
                color: 'white',
                marginTop: '2%',
                textTransform: 'none',
              }}
              onClick={resetForm}
            >
              Cancel
            </Button>
          )}
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
            Post {editMode ? 'updated' : 'submitted'} successfully!
          </Alert>
        </Snackbar>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Box mt={4}  >  
               {posts.map((post) => (
              <Box
                key={post.id}
                mt={2}
              
                sx={{ 
                  width:mediaViewPort? "450px":"100%",
                  height:mediaViewPort?"auto":"auto",
                  borderRadius:"10px",
                  border: "2px solid wheat",
              
                    padding:mediaViewPort?"2%":"1%"
                }}
              >
            
                   {post.image && (
     <img
       src={post.image}
       alt="Post"
       style={{ width: '300px', height: 'auto',
        borderRadius:"5%",
        border:"2px solid gray",
        marginTop:"2%"
        }}
     />
   )}
                <Typography sx={{fontWeight:"bold"}}>{post.title}</Typography>
                <Typography sx={{textAlign:"justify",fontSize:"14px",padding:mediaViewPort?"1%":"2%"}}>{post.body}</Typography>
             
                <Stack direction='row' sx={{margin:"5%"}} >
   
   <FavoriteBorderIcon sx={{width:"15%"}} />
   <MessageIcon sx={{width:"15%"}}/>
   <RedoIcon sx={{width:"15%"}}/>
  </Stack>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    sx={{ marginRight: '10px',textTransform:"none" }}
                    onClick={() => handleEdit(post.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{textTransform:"none",
                    
                    }}
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ))}
          
         
          
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default BlogPost;
