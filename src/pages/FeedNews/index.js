import React, { useEffect, useState } from 'react';

import NewsCard from '../../components/NewsCard';

import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { db } from '../../config/firebaseConfig';

import { makeStyles, CircularProgress } from '@material-ui/core';
import { Container, ButtonContainer, NewsContainer } from './styles';
import { Link } from 'react-router-dom';

export default function FeedNews() {
  const classes = useStyles();

  const [news, setNews] = useState(null);
  const [docIDs, setDocIDs] = useState(null);

  const [toRemove, setToRemove] = useState({ uid: null, id: null });
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getData();
  }, []);

  /**
   * Abre um diálogo perguntando sobre a remoção da notícia
   *
   * @param {*} docId noticia a ser deletada
   */
  function openDialog(docId, id) {
    setOpen(true);
    setToRemove({ uid: docId, id: id });
  }

  /**
   * Remove uma notícia específica
   */
  function removeNews() {
    db.collection('noticias').doc(toRemove.uid).delete();
    let newValues = news.filter((val) => val.id !== toRemove.id);
    setNews(newValues);
    handleClose();
  }

  function handleClose() {
    setToRemove({ uid: null, id: null });
    setOpen(false);
  }

  /**
   * Busca as notícias do firestore
   */
  function getData() {
    db.collection('noticias')
      .orderBy('createdAt', 'desc')
      .get()
      .then((querySnapshot) => {
        const tempList = [];
        const ids = [];
        querySnapshot.forEach((doc) => {
          tempList.push(doc.data());
          ids.push(doc.id);
        });
        setDocIDs(ids);
        setNews(tempList);
      });
  }

  if (news) {
    let newsCards = [];
    for (let index = 0; index < news.length; index++) {
      newsCards.push(
        <NewsCard
          key={index}
          remove={() => openDialog(docIDs[index], news[index].id)}
          content={news[index]}
        />
      );
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
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby={'alert-dialog-title'}
          aria-describedby={'alert-dialog-description'}
        >
          <DialogTitle id={'alert-dialog-title'}>
            {'Deseja remover essa notícia permanente?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id={'alert-dialog-description'}>
              Ao clicar em sim essa notícia e todos os seus conteúdos serão
              removidos
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              variant={'contained'}
              color={'primary'}
              autoFocus
            >
              Não
            </Button>
            <Button onClick={removeNews} color={'primary'}>
              Sim
            </Button>
          </DialogActions>
        </Dialog>
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
