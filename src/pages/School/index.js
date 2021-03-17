import React, { useEffect, useState } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

// Firebase
import { db } from '../../config/firebaseConfig';

import { Container, Image, Title } from './styles';

export default function School({ match }) {
  const [school, setSchool] = useState(null);

  useEffect(() => {
    db.collection('escolas')
      .where('id', '==', match.params.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setSchool(doc.data());
        });
      });
  }, [match.params]);

  function renderPodcast({ title, about, link }) {
    return (
      <div>
        <Title variant="h6">{title}</Title>
        <audio controls>
          <source src={link} type="audio/mp3" />
        </audio>
      </div>
    );
  }

  if (school) {
    const { image, name, podcasts, radioLink, radioName } = school;
    return (
      <Container>
        <Title variant="h3">{name}</Title>
        <div>
          <Image src={image} alt="Imagem da Escola" />
        </div>
        <Title variant="h4">Rádio: {radioName}</Title>
        <div>
          <audio controls>
            <source src={radioLink} type="audio/mp3" />
          </audio>
        </div>
        <Title variant="h5">Podcasts</Title>
        {podcasts ? (
          podcasts.map((item) => renderPodcast(item))
        ) : (
          <p>Nenhum Podcast Encontrado!</p>
        )}
      </Container>
    );
  } else {
    return (
      <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
        <CircularProgress color={'primary'} />
      </div>
    );
  }
}
