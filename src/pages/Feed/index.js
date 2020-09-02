import React, { useState } from 'react';

import NewsCard from '../../components/NewsCard';

import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';

import { db } from '../../config/firebaseConfig';
import { makeStyles, CircularProgress } from '@material-ui/core';
import { Container, ButtonContainer } from './styles';
import { Link } from 'react-router-dom';

export default function Feed() {
  const classes = useStyles();

  const [news, setNews] = useState(null);

  /**
   * Busca as notícias do firestore
   */
  function getData() {
    db.collection('noticias')
      .get()
      .then((querySnapshot) => {
        const tempList = [];
        querySnapshot.forEach((doc) => {
          tempList.push(doc.data());
        });
        setNews(tempList);
      });
  }

  if (news) {
    let rows = [];
    for (let index = 0; index < news.length; index++) {
      rows.push(<NewsCard key={index} content={news[index]} />);
    }

    return (
      <Container>
        <ButtonContainer>
          <Fab
            className={classes.fab}
            variant={'extended'}
            color={'primary'}
            aria-label={'add'}
            component={Link}
            to={'add-noticia'}
          >
            <AddIcon />
            Nova Notícia
          </Fab>
        </ButtonContainer>
        {rows}
      </Container>
    );
  } else {
    getData();
    return (
      <Container>
        <CircularProgress className={classes.loading} color={'primary'} />
      </Container>
    );
  }
}

const useStyles = makeStyles((theme) => ({
  loading: {
    alignSelf: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    marginTop: '20px',
  },
}));
