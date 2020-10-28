import React from 'react';

import { Container, Title, Image } from './styles';

import {
  Card,
  CardActionArea,
  makeStyles,
  CardContent,
  Divider,
  CardActions,
  IconButton,
} from '@material-ui/core';

import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';

export default function SchoolCard(props) {
  const { remove } = props;
  const { id, name, image, radioLink, radioName } = props.content;

  const classes = useStyles();

  return (
    <Container>
      <Card className={classes.root}>
        <CardActionArea
          component={Link}
          to={{ pathname: `/escolas/${id}`, news: props.content }}
        >
          <Image src={image} alt={`Logo ${name}`} />
          <CardContent>
            <Title gutterBottom variant={'h5'} component={'h2'}>
              {`${name} - ${radioName}`}
            </Title>
          </CardContent>
        </CardActionArea>
        <Divider />
        <CardActions className={classes.cardAction}>
          <IconButton onClick={() => console.log('a')} aria-label={'edit'}>
            <EditIcon color={'primary'} />
          </IconButton>
          <IconButton onClick={remove} aria-label={'delete'}>
            <DeleteIcon color={'error'} />
          </IconButton>
          <IconButton onClick={() => console.log('B')} aria-label={'share'}>
            <ShareIcon color={'primary'} />
          </IconButton>
        </CardActions>
      </Card>
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    maxWidth: 365,
    margin: '20px 20px',
  },
  cardAction: {
    padding: '8px 16px',
    justifyContent: 'flex-end',
  },
  icon: {
    width: '100%',
  },
});
