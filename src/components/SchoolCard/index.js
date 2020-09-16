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

import { Share } from '@material-ui/icons/';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';

export default function SchoolCard(props) {
  const { id, name, image, radioLink, radioName } = props.content;

  const classes = useStyles();
  return (
    <Container>
      <Card className={classes.root}>
        <CardActionArea
          component={Link}
          to={{ pathname: `/escolas/${id}`, news: props.content }}
        >
          <CardMedia className={classes.media} image={image} />
          <CardContent>
            <Title gutterBottom variant={'h5'} component={'h2'}>
              {`${name} - ${radioName}`}
            </Title>
          </CardContent>
        </CardActionArea>
        <Divider />
        <CardActions className={classes.cardAction}>
          <IconButton className={classes.icon} aria-label={'edit'}>
            <EditIcon color={'primary'} />
          </IconButton>
          <IconButton className={classes.icon} aria-label={'share'}>
            <Share color={'primary'} />
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
