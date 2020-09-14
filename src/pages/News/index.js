import React, { useState, useEffect } from 'react';
import {
  Typography,
  makeStyles,
  CircularProgress,
  Divider,
} from '@material-ui/core';

// Acesso ao Firestore
import { db } from '../../config/firebaseConfig';

// Icons
import { Event, LocalOffer } from '@material-ui/icons';
import { Container, NewsContainer, Informations, Content } from './styles';

export default function News({ match }) {
  const classes = useStyles();

  const [news, setNews] = useState(null);

  let count = 0;

  useEffect(() => {
    getData(match.params.id);
  }, [match.params]);

  /**
   * Exibe o conteúdo a partir do seu tipo, se for uma imagem tem que retornar um <img/>
   * já se for texto <Typography/>, assim por diante ...
   *
   * @param {*} type qual o tipo de conteúdo (texto,imagem,subtitulo...)
   * @param {*} content o conteúdo em si
   * @param {*} key key
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
          <Typography
            className={classes.text}
            key={key}
            variant="body1"
            gutterBottom
          >
            {content}
          </Typography>
        );
      case 'image':
        return (
          <img
            key={key}
            className={classes.image}
            src={content.toString()}
            alt={''}
          />
        );
      default:
        console.log('\nTipo: ' + type + ' Valor: ' + content);
    }
  }

  function getData(id) {
    db.collection('noticias')
      .where('id', '==', id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setNews(doc.data());
        });
      });
  }

  if (news) {
    const { id, title, image, about, data, tags, content } = news;

    let rows = [];
    content.forEach((element) => {
      rows.push(
        componentProvider(
          Object.keys(element).toString(),
          Object.values(element),
          count++
        )
      );
    });

    return (
      <Container>
        <NewsContainer>
          <Typography className={classes.title} variant="h4" gutterBottom>
            {title}
          </Typography>
          <div>
            <img className={classes.mainImage} src={image} alt={''} />
          </div>
          <Informations>
            <LocalOffer className={classes.icon} />
            <Typography
              className={classes.about}
              variant="caption"
              display="block"
            >
              {tags}
            </Typography>
          </Informations>
          <Informations>
            <Event className={classes.icon} />
            <Typography
              className={classes.about}
              variant="caption"
              display="block"
              gutterBottom
            >
              {data}
            </Typography>
          </Informations>
          <Divider className={classes.divider} />
          <Content>{rows}</Content>
        </NewsContainer>
      </Container>
    );
  } else {
    return (
      <div className={classes.root}>
        <CircularProgress className={classes.loading} color={'primary'} />
      </div>
    );
  }
}

const useStyles = makeStyles({
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  title: {
    padding: '10px 20px',
    maxWidth: '100%',
    wordWrap: 'break-word',
  },
  about: {
    margin: 'auto 0px',
  },
  icon: {
    paddingRight: '6px',
  },
  divider: {
    margin: '20px',
  },
  text: {
    maxWidth: '100%',
    paddingTop: '10px',
    wordWrap: 'break-word',
  },
  mainImage: {
    display: 'flex',
    maxWidth: '100%',
    margin: 'auto',
    paddingBottom: '10px',
  },
  image: {
    maxWidth: '100%',
    margin: '15px auto',
  },
});
