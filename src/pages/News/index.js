import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, Divider } from '@material-ui/core';

// Acesso ao Firestore
import { db } from '../../config/firebaseConfig';

// Icons
import { Event, LocalOffer } from '@material-ui/icons';
import {
  Container,
  NewsContainer,
  Information,
  Content,
  Title,
  Image,
  Text,
} from './styles';

export default function News({ match }) {
  const [news, setNews] = useState(null);

  /**
   * Busca a notícia pelo id da url
   */
  useEffect(() => {
    db.collection('noticias')
      .where('id', '==', match.params.id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setNews(doc.data());
        });
      });
  }, [match.params]);

  /**
   * Exibe o conteúdo a partir do seu tipo, se for uma imagem tem que retornar um <img/>
   * já se for texto <Typography/>, assim por diante ...
   *
   * @param {String} type qual o tipo de conteúdo (texto,imagem,subtitulo...)
   * @param {String} content o conteúdo em si
   * @param {Number} key key
   */
  function componentProvider(type, content, key) {
    switch (type) {
      case 'subtitulo':
        return (
          <Typography key={key} variant="h6" gutterBottom>
            {content}
          </Typography>
        );
      case 'texto':
        return (
          <Text key={key} variant="body1" gutterBottom>
            {content}
          </Text>
        );
      case 'image':
        return (
          <img
            key={key}
            style={{ maxWidth: '100%', margin: '15px auto' }}
            src={content.toString()}
            alt={''}
          />
        );
      default:
        console.log('\nTipo: ' + type + ' Valor: ' + content);
    }
  }

  if (news) {
    const { title, image, date, tags, content } = news;

    return (
      <Container>
        <NewsContainer>
          <Title variant="h4" gutterBottom>
            {title}
          </Title>
          <div>
            <Image src={image} alt={'Imagem da notícia'} />
          </div>
          <Information>
            <LocalOffer style={{ paddingRight: '6px' }} />
            <Typography
              style={{ margin: 'auto 0px' }}
              variant="caption"
              display="block"
            >
              {tags}
            </Typography>
          </Information>
          <Information>
            <Event style={{ paddingRight: '6px' }} />
            <Typography
              style={{ margin: 'auto 0px' }}
              variant="caption"
              display="block"
              gutterBottom
            >
              {date}
            </Typography>
          </Information>
          <Divider style={{ margin: '20px' }} />
          <Content>
            {content.map((element, index) => {
              const type = Object.keys(element).toString();
              const values = Object.values(element);
              return componentProvider(type, values, index);
            })}
          </Content>
        </NewsContainer>
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
