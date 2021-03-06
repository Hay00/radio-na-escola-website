import React from 'react';

import {
  CardActionArea,
  CardContent,
  Divider,
  IconButton,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';

import { Link } from 'react-router-dom';

import { Actions, Container, Image, MyCard, Title } from './styles';

export default function SchoolCard({ remove, content }) {
  const { id, name, image, radioName } = content;
  return (
    <Container>
      <MyCard>
        <CardActionArea
          component={Link}
          to={{ pathname: `/escolas/${id}`, news: content }}
        >
          <Image src={image} alt={`Logo ${name}`} />
          <CardContent>
            <Title gutterBottom variant={'h5'} component={'h2'}>
              {`${name} - ${radioName}`}
            </Title>
          </CardContent>
        </CardActionArea>
        <Divider />
        <Actions>
          <IconButton onClick={() => console.log('a')} aria-label={'edit'}>
            <EditIcon color={'primary'} />
          </IconButton>
          <IconButton onClick={remove} aria-label={'delete'}>
            <DeleteIcon color={'error'} />
          </IconButton>
          <IconButton onClick={() => console.log('B')} aria-label={'share'}>
            <ShareIcon color={'primary'} />
          </IconButton>
        </Actions>
      </MyCard>
    </Container>
  );
}
