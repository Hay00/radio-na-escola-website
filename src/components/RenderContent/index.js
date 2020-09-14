import React from 'react';
import { Container, NewsImage, Holder } from './styles';
import { TextField, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import ContentArrows from '../ContentArrows';
import ImagePicker from '../ImagePicker';

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
            onChange={handleContentChange(index)}
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
            onChange={handleContentChange(index)}
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
              <ImagePicker
                id={index}
                placeHolder={'Adicione uma imagem'}
                value={content[contentType]}
                onChange={handleContentChange(index)}
              />
              <IconButton
                aria-label="delete"
                onClick={() => removeContent(index)}
              >
                <Delete color={'error'} />
              </IconButton>
            </Holder>
          </NewsImage>
        </Container>
      );

    default:
      console.log('Error');
      break;
  }
}
