import React, { useEffect, useState } from 'react';

import { Container, ButtonContainer, SchoolsContainer } from './styles';

import { CircularProgress, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { db } from '../../config/firebaseConfig';

import { Link } from 'react-router-dom';
import SchoolCard from '../../components/SchoolCard';

export default function FeedSchools() {
  const [schools, setSchools] = useState(null);
  const [docIDs, setDocIDs] = useState(null);

  const [toRemove, setToRemove] = useState({ uid: null, id: null });
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getData();
  }, []);

  /**
   * Abre um diálogo perguntando sobre a remoção da escola
   *
   * @param {*} docId escola que irá ser removida
   */
  function openDialog(docId, id) {
    setOpen(true);
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

  function handleClose() {
    setToRemove({ uid: null, id: null });
    setOpen(false);
  }

  /**
   * Busca as notícias do firestore
   */
  function getData() {
    db.collection('escolas')
      .orderBy('name', 'asc')
      .get()
      .then((querySnapshot) => {
        const tempList = [];
        const ids = [];
        querySnapshot.forEach((doc) => {
          tempList.push(doc.data());
          ids.push(doc.id);
        });
        setDocIDs(ids);
        setSchools(tempList);
      });
  }

  if (schools) {
    let schoolsCards = [];
    for (let index = 0; index < schools.length; index++) {
      schoolsCards.push(
        <SchoolCard
          key={index}
          remove={() => openDialog(docIDs[index], schools[index].id)}
          content={schools[index]}
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
            to={'escolas/add-escola'}
          >
            <AddIcon />
            Nova Escola
          </Fab>
        </ButtonContainer>
        <SchoolsContainer>{schoolsCards}</SchoolsContainer>
        <Dialog
          open={open}
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
      </Container>
    );
  } else {
    return (
      <Container>
        <CircularProgress
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
          }}
          color={'primary'}
        />
      </Container>
    );
  }
}
