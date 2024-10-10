import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import React from 'react'
import './BlogComponent.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';
import RedoIcon from '@mui/icons-material/Redo';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
const BlogComponent = (props) => {
  return (
    <div>
      <Card class='card'>
        <CardMedia
        component='img'
        image={props.image}
         class="card-media"
        />
        <CardContent  class="card-content">
            <Typography class="card-title">{props.title}</Typography>
          <Typography class="card-description">{props.content}</Typography>
        </CardContent>
        <Stack direction='row' >
         <FavoriteIcon class='favorite-icon'/>
         <FavoriteBorderIcon class='favoriteborder-icon'/>
         <MessageIcon class='message-icon'/>
         <RedoIcon class='redo-icon'/>
        </Stack>
      </Card>
    </div>
  )
}


export default BlogComponent
