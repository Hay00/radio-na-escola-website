import React, { useState } from 'react';

import { Container } from './styles';
import { db } from '../../config/firebaseConfig';

export default function Main() {
  const [valor, setValor] = useState(false);

  let noticias = {};

  function getData() {
    db.ref('/noticias')
      .once('value')
      .then(function (dataSnapshot) {
        let data = dataSnapshot.val() ? dataSnapshot.val() : {};
        console.log(data);
        setValor(data);
      });
  }

  function add() {
    noticias.values.forEach((noticia) => {
      db.ref('/noticias').push({
        about: noticia.about,
        category: noticia.category,
        content: noticia.content,
        data: noticia.data,
        id: noticia.id,
        image: noticia.image,
        link: noticia.link,
        tags: noticia.tags,
        title: noticia.title,
      });
    });
  }

  return (
    <Container>
      <text>Teste</text>
      <text>{valor ? 'True' : 'False'}</text>
    </Container>
  );
}
