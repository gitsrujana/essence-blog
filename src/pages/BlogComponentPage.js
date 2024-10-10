import { Grid } from '@mui/material'
import React from 'react'

import { bloghomedata } from '../assets/assets'
import BlogComponent from '../components/Home/BlogComponent'

const BlogComponentPage = () => {
  return (
    
    <div >
      <Grid container sx={{marginTop:"8%"}}>
        {
            bloghomedata.map((item)=>{
                return(
                    <Grid md={3.2} >
                        <BlogComponent
                        image={item.image}
                        title={item.title}
                        content={item.content}
                        />
                    </Grid>
                )
            })
        }
      </Grid>
    </div>
  )
}

export default BlogComponentPage
