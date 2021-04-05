import React, { useEffect, useState } from 'react';

// Componentes material-ui
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import Snackbar from '@material-ui/core/Snackbar';
import AddIcon from '@material-ui/icons/Add';

// Link do router
import { Link } from 'react-router-dom';

// Componentes locais
import NewsCard from '../../components/NewsCard';

// Firebase
import { db } from '../../config/firebaseConfig';
import Firebase from '../../utils/firebaseFunctions';

import { ButtonContainer, Container, NewsContainer } from './styles';

export default function FeedNews() {
  const [news, setNews] = useState(null);

  const [toRemove, setToRemove] = useState({ uid: null, id: null });
  const [showDialog, setShowDialog] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);

  /**
   * Busca as notícias do firestore
   */
  useEffect(() => {
    async function getNews() {
      const data = await Firebase.getAllNews();
      setNews(data);
    }
    getNews();
  }, []);

  /**
   * Abre um diálogo perguntando sobre a remoção da notícia
   *
   * @param {String} docId id do documento da notícia
   * @param {String} id id padrão da notícia
   */
  function openDialog(docId, id) {
    setShowDialog(true);
    setToRemove({ uid: docId, id: id });
  }

  /**
   * Remove uma notícia específica
   */
  function removeNews() {
    db.collection('noticias').doc(toRemove.uid).delete();
    let newValues = news.filter((val) => val.id !== toRemove.id);
    setNews(newValues);
    closeDialog();
  }

  /**
   * Fecha o modal
   */
  function closeDialog() {
    setToRemove({ uid: null, id: null });
    setShowDialog(false);
  }

  /**
   * Feca a snackbar
   */
  function closeSnackBar() {
    setShowSnackBar(false);
  }

  /**
   * Copia o link para a clipboard do usuário mostrando uma
   * notificação ao copiar
   * @param {String} link link a ser copiado
   */
  function onShare(link) {
    navigator.clipboard.writeText(link);
    setShowSnackBar(true);
  }

  if (news) {
    return (
      <Container>
        <ButtonContainer>
          <Fab
            variant={'extended'}
            color={'primary'}
            aria-label={'add'}
            component={Link}
            to={{ pathname: 'noticias/add' }}
          >
            <AddIcon />
            Nova Notícia
          </Fab>
        </ButtonContainer>
        <NewsContainer>
          {news.map((value) => (
            <NewsCard
              key={value.id}
              remove={() => openDialog(value.docId, value.id)}
              content={value}
              onShare={onShare}
            />
          ))}
        </NewsContainer>
        <Dialog
          open={showDialog}
          onClose={closeDialog}
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
              onClick={closeDialog}
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
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={showSnackBar}
          autoHideDuration={6000}
          onClose={closeSnackBar}
          message="Link copiado!"
        />
      </Container>
    );
  } else {
    return (
      <Container>
        <CircularProgress
          style={{ position: 'absolute', top: '50%', left: '50%' }}
          color={'primary'}
        />
      </Container>
    );
  }
}
