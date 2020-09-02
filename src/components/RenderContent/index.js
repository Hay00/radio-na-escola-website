import React from 'react';
import { Container, NewsImage, Holder } from './styles';
import ContentArrows from '../ContentArrows';
import { TextField, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import Alert from '../Alert';

export default function RenderContent(props) {
  const {
    index,
    content,
    maxIndex,
    moveContent,
    handleContentChange,
    removeContent,
  } = props;

  // Qual o tipo de conteúdo
  const contentType = Object.keys(content)[0];

  switch (contentType) {
    case 'subtitulo':
      return (
        <Container>
          <ContentArrows
            index={index}
            maxIndex={maxIndex}
            onClick={moveContent}
          />
          <TextField
            id="text"
            name={'subtitulo'}
            style={{ margin: 8 }}
            label="Subtítulo"
            placeholder="Insira um Subtítulo"
            variant={'outlined'}
            fullWidth
            multiline
            margin="normal"
            value={content[contentType]}
            onChange={(e) => handleContentChange(e, index)}
          />
          <IconButton aria-label="delete" onClick={() => removeContent(index)}>
            <Delete color={'error'} />
          </IconButton>
        </Container>
      );

    case 'texto':
      return (
        <Container>
          <ContentArrows
            index={index}
            maxIndex={maxIndex}
            onClick={moveContent}
          />
          <TextField
            id="text"
            name={'texto'}
            style={{ margin: 8 }}
            label="Parágrafo"
            placeholder="Insira um texto"
            variant={'outlined'}
            fullWidth
            multiline
            margin="normal"
            value={content[contentType]}
            onChange={(e) => handleContentChange(e, index)}
          />
          <IconButton aria-label="delete" onClick={() => removeContent(index)}>
            <Delete color={'error'} />
          </IconButton>
        </Container>
      );

    case 'image':
      return (
        <Container>
          <NewsImage>
            <Holder>
              <ContentArrows
                index={index}
                maxIndex={maxIndex}
                onClick={moveContent}
              />
              <TextField
                id="image-news"
                name={'image'}
                label="Imagem (Link)"
                style={{ margin: 8 }}
                required
                fullWidth
                multiline
                rowsMax={6}
                margin="normal"
                variant={'outlined'}
                value={content[contentType]}
                onChange={(e) => handleContentChange(e, index)}
              />
              <IconButton
                aria-label="delete"
                onClick={() => removeContent(index)}
              >
                <Delete color={'error'} />
              </IconButton>
            </Holder>

            {content[contentType] ? (
              <img
                style={{ height: '100%', width: '100%', objectFit: 'contain' }}
                alt={'Imagem da Noticia'}
                src={content[contentType]}
              />
            ) : (
              <Alert severity="warning">Insira um link de uma imagem!</Alert>
            )}
          </NewsImage>
        </Container>
      );

    default:
      console.log('Error');
      break;
  }
}
