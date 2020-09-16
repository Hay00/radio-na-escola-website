import React, { useEffect, useState } from 'react';

import NewsCard from '../../components/NewsCard';

import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';

import { db } from '../../config/firebaseConfig';

import { makeStyles, CircularProgress } from '@material-ui/core';
import { Container, ButtonContainer, NewsContainer } from './styles';
import { Link } from 'react-router-dom';

export default function FeedNews() {
  const classes = useStyles();

  const [news, setNews] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  /**
   * Busca as notícias do firestore
   */
  function getData() {
    db.collection('noticias')
      .orderBy('createdAt', 'desc')
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
    let newsCards = [];
    for (let index = 0; index < news.length; index++) {
      newsCards.push(<NewsCard key={index} content={news[index]} />);
    }

    return (
      <Container>
        <ButtonContainer>
          <Fab
            variant={'extended'}
            color={'primary'}
            aria-label={'add'}
            component={Link}
            to={'noticias/add-noticia'}
          >
            <AddIcon />
            Nova Notícia
          </Fab>
        </ButtonContainer>
        <NewsContainer>{newsCards}</NewsContainer>
      </Container>
    );
  } else {
    return (
      <Container>
        <CircularProgress className={classes.loading} color={'primary'} />
      </Container>
    );
  }
}

const useStyles = makeStyles((theme) => ({
  loading: {
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
}));
