import React, { useState } from 'react';

import { Container } from './styles';
import NewsComponent from '../../components/NewsComponent';

import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';

import { db } from '../../config/firebaseConfig';
import { makeStyles } from '@material-ui/core';

export default function Feed() {
  const classes = useStyles();

  const [news, setNews] = useState(null);

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

  if (news === null) {
    getData();
    return <Container></Container>;
  } else {
    let rows = [];
    for (let index = 0; index < news.length; index++) {
      rows.push(<NewsComponent key={index} content={news[index]} />);
    }

    return (
      <Container>
        <Fab
          className={classes.fab}
          variant={'extended'}
          color={'primary'}
          aria-label={'add'}
        >
          <AddIcon />
          Nova Notícia
        </Fab>
        {rows}
      </Container>
    );
  }
}

const useStyles = makeStyles((theme) => ({
  fab: {
    marginTop: '20px',
  },
}));
