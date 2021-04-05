import React from 'react';

// Componentes material-ui
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';

// Link do router
import { Link } from 'react-router-dom';

import { Actions, Container, Image, MyCard, Title } from './styles';

export default function SchoolCard({ remove, content, onShare }) {
  const { docId, id, name, image, radioName, radioLink } = content;
  return (
    <Container>
      <MyCard>
        <CardActionArea
          component={Link}
          to={{ pathname: `/escolas/${id}`, state: { docId } }}
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
          <IconButton
            component={Link}
            to={{
              pathname: `/escolas/edit/${id}`,
              state: { docId },
            }}
            aria-label={'edit'}
          >
            <EditIcon color={'primary'} />
          </IconButton>
          {remove && (
            <IconButton onClick={remove} aria-label={'delete'}>
              <DeleteIcon color={'error'} />
            </IconButton>
          )}
          <IconButton onClick={() => onShare(radioLink)} aria-label={'share'}>
            <ShareIcon color={'primary'} />
          </IconButton>
        </Actions>
      </MyCard>
    </Container>
  );
}
