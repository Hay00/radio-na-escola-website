import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

import { Event, LocalOffer } from '@material-ui/icons';

export default function News({ location }) {
  const classes = useStyles();

  let count = 0;

  /**
   * Exibe o conteúdo a partir do seu tipo, se for uma imagem tem que retornar um <Image/>
   * já se for texto <text/>, assim por diante ...
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
            src={{ uri: content.toString() }}
            alt={''}
          />
        );
      default:
        console.log('\nTipo: ' + type + ' Valor: ' + content);
    }
  }

  if (location.news) {
    const { id, title, image, about, data, tags, content } = location.news;

    console.log(image);

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
      <div className={classes.root}>
        <Typography className={classes.title} variant="h4" gutterBottom>
          {title}
        </Typography>
        <img className={classes.image} src={image} alt={''} />
        <div className={classes.about}>
          <LocalOffer />
          <Typography variant="caption" display="block" gutterBottom>
            {tags}
          </Typography>
        </div>
        <div className={classes.about}>
          <Event />
          <Typography variant="caption" display="block" gutterBottom>
            {data}
          </Typography>
        </div>
        <div className={classes.content}>{rows}</div>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Typography variant="body1" gutterBottom>
          Erro
        </Typography>
      </div>
    );
  }
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: 640,
    margin: 'auto',
  },
  title: {
    padding: '20px 10px',
  },
  about: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    padding: '10px 8px'
  },
  line: {
    margin: '20px 0px',
    backgroundColor: '#A2A2A2',
    height: 0.8,
    width: '90%',
  },
  content: {
    padding: '0px 10px',
  },
  subTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 35,
    paddingBottom: 15,
  },
  text: {
    paddingTop: '10px',
  },
  image: {
    margin: '20px 0',
    aspectRatio: 2,
    width: '100%',
    borderWidth: 0.05,
  },
});
