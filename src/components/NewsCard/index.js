import React from 'react';

// Componentes material-ui
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';

// Link do router
import { Link } from 'react-router-dom';

import { About, Actions, Container, MyCard, Title } from './styles';

export default function NewsCard({ remove, content }) {
  const { docId, id, title, image, about, tags } = content;

  return (
    <Container>
      <MyCard>
        <CardActionArea
          component={Link}
          to={{ pathname: `/noticias/${id}`, state: { docId } }}
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
          <IconButton
            component={Link}
            to={{
              pathname: `/noticias/edit/${id}`,
              state: { docId },
            }}
            style={{ width: '10%' }}
            aria-label={'edit'}
          >
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
