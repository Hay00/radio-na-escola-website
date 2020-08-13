import React from 'react';

import { Title, About } from './styles';

import {
  Card,
  CardActionArea,
  CardMedia,
  makeStyles,
  CardContent,
  Typography,
  Divider,
  CardActions,
  IconButton,
} from '@material-ui/core';

import { Share, Visibility } from '@material-ui/icons/';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';

export default function NewsComponent(props) {
  const { id, title, image, about, data, tags } = props.content;

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea
        component={Link}
        to={{ pathname: `/noticia/${id}`, news: props.content }}
      >
        <CardMedia className={classes.media} image={image} />
        <CardContent>
          <Title gutterBottom variant={'h5'} component={'h2'}>
            {title}
          </Title>
          <About variant={'body2'} color={'textPrimary'} component={'p'}>
            {about}
          </About>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActions className={classes.cardAction}>
        <Typography
          className={classes.about}
          variant={'body2'}
          color={'textSecondary'}
          component={'p'}
        >
          Tags: {tags}
        </Typography>
        <IconButton className={classes.icon} aria-label={'view'}>
          <Visibility color={'primary'} />
        </IconButton>
        <IconButton className={classes.icon} aria-label={'edit'}>
          <EditIcon color={'primary'} />
        </IconButton>
        <IconButton className={classes.icon} aria-label={'share'}>
          <Share color={'primary'} />
        </IconButton>
      </CardActions>
    </Card>
  );
}

const useStyles = makeStyles({
  root: {
    maxWidth: 512,
    //minHeight: 575, -> Responsivo
    //flex: '1 0 50%',
    margin: '20px',
  },
  media: {
    height: 260,
  },
  cardAction: {
    padding: '8px 16px',
  },
  about: {
    width: '70%',
  },
  icon: {
    width: '10%',
  },
});
