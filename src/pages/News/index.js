import React, { useEffect, useState } from 'react';

// Componentes material-ui
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import EventIcon from '@material-ui/icons/Event';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

// Firebase
import Firebase from '../../utils/firebaseFunctions';

import {
  Container,
  Content,
  H1,
  H2,
  Image,
  Information,
  ListItem,
  ListNumber,
  NewsContainer,
  Quote,
  Text,
  Title,
} from './styles';

export default function News({ location, match }) {
  const docId = location?.state?.docId || null;
  const [news, setNews] = useState(null);

  /**
   * Busca a notícia pelo id da url
   */
  useEffect(() => {
    async function getNews() {
      let data = [];
      if (docId) {
        data = await Firebase.findNews(docId);
      } else {
        data = await Firebase.findNewsWithURL(match.params.id);
        data = data[0];
      }
      if (data) {
        setNews(data);
      }
    }
    getNews();
  }, [docId, match.params]);

  /**
   * Monta o texto, podendo ser negrito, itálico e sublinhado
   *
   * @param {Object} content conteúdo a ser montado
   * @returns
   */
  function textBuilder(content) {
    return content.map(({ text, bold, italic, underline }, index) => {
      if (bold) {
        text = <strong>{text}</strong>;
      }
      if (italic) {
        text = <em>{text}</em>;
      }
      if (underline) {
        text = <u>{text}</u>;
      }
      return <span key={index}>{text}</span>;
    });
  }

  /**
   * Gera o estilo do alinhamento de texto
   *
   * @param {String} type tipo de alinhamento
   * @returns CSS
   */
  function getTextAlign(type) {
    switch (type) {
      case 'center':
        return { textAlign: 'center' };
      case 'right':
        return { textAlign: 'right' };
      case 'justify':
        return {
          textAlign: 'justify',
          textJustify: 'inter-word',
          whiteSpace: 'normal',
        };
      default:
        return { textAlign: 'left' };
    }
  }

  /**
   * Renderiza uma lista com itens
   *
   * @param {*} children conteúdo dentro da lista
   * @param {Boolean} numbered essa lista é enumerada?
   * @returns JSX
   */
  function List({ children, numbered }) {
    if (numbered) {
      return (
        <ListNumber>
          {children.map((item, i) => (
            <li key={i}>
              <p style={getTextAlign(item.textAlign)}>
                {textBuilder(item.children)}
              </p>
            </li>
          ))}
        </ListNumber>
      );
    }
    return (
      <ListItem>
        {children.map((item, i) => (
          <li key={i}>
            <p style={getTextAlign(item.textAlign)}>
              {textBuilder(item.children)}
            </p>
          </li>
        ))}
      </ListItem>
    );
  }

  /**
   * Exibe o conteúdo a partir do seu tipo, se for uma imagem tem que retornar um <Image/>
   * já se for texto <Text/>, assim por diante ...
   *
   * @param {String} type qual o tipo de conteúdo (texto,imagem,subtitulo...)
   * @param {String} content o conteúdo em si
   */
  function NewsBuilder({ content }) {
    const { children, type, textAlign } = content;
    const style = getTextAlign(textAlign);
    switch (type) {
      case 'image':
        return (
          <img
            style={{ maxWidth: '100%', margin: '15px auto' }}
            src={content.url}
            alt={''}
          />
        );
      case 'block-quote':
        return <Quote style={style}>{textBuilder(children)}</Quote>;
      case 'heading-one':
        return <H1 style={style}>{children[0].text}</H1>;
      case 'heading-two':
        return <H2 style={style}>{children[0].text}</H2>;
      case 'list-item':
        return <li>{children}</li>;
      case 'bulleted-list':
        return <List>{children}</List>;
      case 'numbered-list':
        return <List numbered>{children}</List>;

      default:
        return (
          <Text style={style} variant="body1" gutterBottom>
            {textBuilder(children)}
          </Text>
        );
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
            <LocalOfferIcon style={{ paddingRight: '6px' }} />
            <Typography
              style={{ margin: 'auto 0px' }}
              variant="caption"
              display="block"
            >
              {tags}
            </Typography>
          </Information>
          <Information>
            <EventIcon style={{ paddingRight: '6px' }} />
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
            {content.map((content, index) => (
              <NewsBuilder key={index} content={content} />
            ))}
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
