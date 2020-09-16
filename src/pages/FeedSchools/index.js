import React, { useEffect, useState } from 'react';

import { Container, ButtonContainer, SchoolsContainer } from './styles';

import { CircularProgress, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { db } from '../../config/firebaseConfig';

import { Link } from 'react-router-dom';
import SchoolCard from '../../components/SchoolCard';

export default function FeedSchools() {
  const [schools, setSchools] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  /**
   * Busca as notícias do firestore
   */
  function getData() {
    db.collection('escolas')
      .orderBy('name', 'asc')
      .get()
      .then((querySnapshot) => {
        const tempList = [];
        querySnapshot.forEach((doc) => {
          tempList.push(doc.data());
        });
        setSchools(tempList);
      });
  }

  if (schools) {
    let schoolsCards = [];
    for (let index = 0; index < schools.length; index++) {
      schoolsCards.push(<SchoolCard key={index} content={schools[index]} />);
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
