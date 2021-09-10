import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid'

import { baseBackendURLImages } from '../config/global';
import { Link } from 'react-router-dom';
export default function ImgMediaCard({
    id,
    title,
    image,
    description,
    price,
    category
}) {


    return (
        <Card >
            <Link
                style={{ textDecoration: 'none', color: 'black' }}
                variant="body2"
                color="black"
                to={`/dashboard/product/edit/${id}`}
            >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="150"
                        // image="https://images.unsplash.com/photo-1628438273202-a26e785d044f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMTA2MzA4OQ&ixlib=rb-1.2.1&q=80&w=1080"
                        image={baseBackendURLImages + image}
                        title={title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" align="center">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {description}
                        </Typography>

                    </CardContent>
                    <CardActions>

                        <Grid item xs={12} md={6} lg={8} align="center">
                            <Typography gutterBottom variant="h6" component="h4">
                                {price} LE
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} lg={8} align="center">
                            <Typography gutterBottom variant="h6" component="h4">
                                <Chip
                                    label={category}
                                    color="primary"
                                />
                            </Typography>
                        </Grid>
                    </CardActions>
                </CardActionArea>
            </Link>

        </Card >
    );
}