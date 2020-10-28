import React from 'react';

import { Container, Title, About } from './styles';

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

import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { Link } from 'react-router-dom';

export default function NewsCard(props) {
  const { remove } = props;
  const { id, title, image, about, tags } = props.content;

  const classes = useStyles();

  return (
    <Container>
      <Card className={classes.root}>
        <CardActionArea
          component={Link}
          to={{ pathname: `/noticias/${id}`, news: props.content }}
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
          <Typography variant={'body2'} color={'textSecondary'} component={'p'}>
            Tags:
          </Typography>
          <Typography
            className={classes.about}
            variant={'body2'}
            color={'textSecondary'}
            component={'p'}
          >
            {tags}
          </Typography>
          <IconButton className={classes.icon} aria-label={'edit'}>
            <EditIcon color={'primary'} />
          </IconButton>
          <IconButton onClick={remove} aria-label={'delete'}>
            <DeleteIcon color={'error'} />
          </IconButton>
          <IconButton className={classes.icon} aria-label={'share'}>
            <ShareIcon color={'primary'} />
          </IconButton>
        </CardActions>
      </Card>
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    maxWidth: 512,
    margin: '20px 20px',
  },
  media: {
    paddingTop: '56.25%',
  },
  cardAction: {
    padding: '8px 16px',
    alignItems: 'center',
  },
  about: {
    width: '70%',
  },
  icon: {
    width: '10%',
  },
});
