import React from 'react';

import {
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';

import { Link } from 'react-router-dom';

import { About, Actions, MyCard, Container, Title } from './styles';

export default function NewsCard({ remove, content }) {
  const { id, title, image, about, tags } = content;

  return (
    <Container>
      <MyCard>
        <CardActionArea
          component={Link}
          to={{ pathname: `/noticias/${id}`, news: content }}
        >
          <CardMedia style={{ paddingTop: '56.25%' }} image={image} />
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
        <Actions>
          <Typography variant={'body2'} color={'textSecondary'} component={'p'}>
            Tags:
          </Typography>
          <Typography
            style={{ width: '70%' }}
            variant={'body2'}
            color={'textSecondary'}
            component={'p'}
          >
            {tags}
          </Typography>
          <IconButton style={{ width: '10%' }} aria-label={'edit'}>
            <EditIcon color={'primary'} />
          </IconButton>
          <IconButton onClick={remove} aria-label={'delete'}>
            <DeleteIcon color={'error'} />
          </IconButton>
          <IconButton style={{ width: '10%' }} aria-label={'share'}>
            <ShareIcon color={'primary'} />
          </IconButton>
        </Actions>
      </MyCard>
    </Container>
  );
}
