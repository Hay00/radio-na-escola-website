import React, { useEffect, useState } from 'react';

// Componentes material-ui
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
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
import SchoolCard from '../../components/SchoolCard';

// Firebase
import { db } from '../../config/firebaseConfig';
import Firebase from '../../utils/firebaseFunctions';

import { ButtonContainer, Container, SchoolsContainer } from './styles';

export default function FeedSchools() {
  const [schools, setSchools] = useState(null);

  const [toRemove, setToRemove] = useState({ uid: null, id: null });
  const [shoDialog, setShowDialog] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);

  /**
   * Buscando as escolas do firestore
   */
  useEffect(() => {
    async function getSchools() {
      const data = await Firebase.getAllSchools();
      setSchools(data);
    }
    getSchools();
  }, []);

  /**
   * Abre um diálogo perguntando sobre a remoção da escola
   *
   * @param {String} docId id do documento da escola
   * @param {String} id id padrão da escola
   */
  function openDialog(docId, id) {
    setShowDialog(true);
    setToRemove({ uid: docId, id: id });
  }

  /**
   * Remove uma escola específica
   */
  function removeSchool() {
    db.collection('escolas').doc(toRemove.uid).delete();
    let newValues = schools.filter((school) => school.id !== toRemove.id);
    setSchools(newValues);
    handleClose();
  }

  /**
   * Fecha o modal
   */
  function handleClose() {
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

  if (schools) {
    return (
      <Container>
        <ButtonContainer>
          <Fab
            variant={'extended'}
            color={'primary'}
            aria-label={'add'}
            component={Link}
            to={{ pathname: 'escolas/add' }}
          >
            <AddIcon />
            Nova Escola
          </Fab>
        </ButtonContainer>
        <SchoolsContainer>
          {schools.map((value) => (
            <SchoolCard
              key={value.id}
              remove={() => openDialog(value.docId, value.id)}
              content={value}
              onShare={onShare}
            />
          ))}
        </SchoolsContainer>
        <Dialog
          open={shoDialog}
          onClose={handleClose}
          aria-labelledby={'alert-dialog-title'}
          aria-describedby={'alert-dialog-description'}
        >
          <DialogTitle id={'alert-dialog-title'}>
            {'Deseja remover essa escola permanente?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id={'alert-dialog-description'}>
              Ao clicar em sim essa escola e todos os seus conteúdos serão
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
            <Button onClick={removeSchool} color={'primary'}>
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
