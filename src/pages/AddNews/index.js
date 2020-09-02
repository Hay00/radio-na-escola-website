import React, { useState } from 'react';

import {
  Container,
  News,
  Title,
  Url,
  Image,
  Informations,
  SaveArea,
} from './styles';

import {
  TextField,
  makeStyles,
  Divider,
  InputAdornment,
  Button,
  MenuItem,
} from '@material-ui/core';

import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import LinkIcon from '@material-ui/icons/Link';
import SaveIcon from '@material-ui/icons/Save';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { ptBR } from 'date-fns/locale';
import DateFnsUtils from '@date-io/date-fns';

import AddContentMenu from '../../components/AddContentMenu';
import Alert from '../../components/Alert';
import RenderContent from '../../components/RenderContent';

import { db, timestamp } from '../../config/firebaseConfig';

export default function AddNews() {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('Empreendedorismo');
  const [link, setLink] = useState('');
  const [tags, setTags] = useState('');
  const [time, setTime] = useState(new Date());

  const [contents, setContent] = useState([]);

  const categories = [
    {
      category: 'Empreendedorismo',
      label: 'Empreendedorismo',
    },
    {
      category: 'Comunicação',
      label: 'Comunicação',
    },
    {
      category: 'Tecnologia',
      label: 'Tecnologia',
    },
  ];

  /**
   * Gerencia a mudança do conteúdo dos itens
   *
   * @param {*} event evento relacionado ao componente (nome, valor)
   * @param {*} key índice do item
   */
  function handleContentChange(event, key) {
    let dummyState = [...contents];
    dummyState[key][event.target.name] = event.target.value;
    setContent(dummyState);
  }

  /**
   * Adiciona um novo item
   *
   * @param {*} type tipo de item
   */
  function addNewContent(type) {
    let dummyState = { [type]: '' };
    setContent([...contents, dummyState]);
  }

  /**
   * Remove um item usando um índice
   *
   * @param {*} key índice do item
   */
  function removeContent(key) {
    let dummyState = [...contents];
    dummyState.splice(key, 1);
    setContent([]);
    setContent(dummyState);
  }

  /**
   * Move o item para certo índice
   *
   * @param {*} from índice inicial
   * @param {*} to índice de destino
   */
  function moveContent(from, to) {
    let dummyState = [...contents];
    let aux = dummyState[to];
    dummyState[to] = dummyState[from];
    dummyState[from] = aux;
    setContent([]);
    setContent(dummyState);
  }

  /**
   *
   * @param {*} key índice do item
   */
  function renderContent(key) {
    return (
      <RenderContent
        key={key}
        index={parseInt(key, 10)}
        content={contents[key]}
        maxIndex={contents.length}
        handleContentChange={handleContentChange}
        moveContent={moveContent}
        removeContent={removeContent}
      />
    );
  }

  /**
   * Cria um id usando a data + título
   *
   * ex: 01/01/2000/um-titulo
   *
   * @returns id
   */
  function createId() {
    let lowerTitle = title.toLowerCase().replace(/ /g, '-');
    let date = time.toLocaleDateString();
    return date + '/' + lowerTitle;
  }

  /**
   * Pega o primeiro elemento de texto para colocar no about
   */
  function getFirstText() {
    let firstText = { texto: '' };
    for (let i = 0; i < contents.length; i++) {
      const element = Object.keys(contents[i])[0];
      if (element === 'texto') {
        firstText = contents[i]['texto'];
        break;
      }
    }
    return firstText;
  }

  /**
   * Salva a noticia no Firestore
   */
  function saveNews() {
    let dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

    db.collection('noticias')
      .add({
        about: getFirstText(),
        category: category,
        content: contents,
        data: time.toLocaleDateString('pt-BR', dateOptions),
        createdAt: timestamp(),
        id: createId(),
        image: image,
        link: link,
        tags: tags,
        title: title,
      })
      .then(console.log('Noticia adicionada!'));
  }

  return (
    <Container>
      <News>
        <Title>
          <TextField
            id={'title'}
            label={'Título'}
            className={classes.input}
            required
            fullWidth
            multiline
            rowsMax={4}
            margin={'normal'}
            variant={'outlined'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Title>
        <Url>
          <TextField
            id={'image-url'}
            label={'Imagem da Thumbnail (Link)'}
            className={classes.input}
            required
            fullWidth
            multiline
            rowsMax={6}
            margin={'normal'}
            variant={'outlined'}
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Url>
        {image.length > 0 ? (
          <Image>
            <img
              className={classes.img}
              alt={'Imagem de Thumbnail'}
              src={image}
            />
          </Image>
        ) : (
          <Alert>Insira um link de uma imagem!</Alert>
        )}

        <Informations>
          <TextField
            id={'category'}
            label={'Categoria'}
            className={classes.input}
            select
            required
            fullWidth
            variant={'outlined'}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((option) => (
              <MenuItem key={option.category} value={option.category}>
                {option.category}
              </MenuItem>
            ))}
          </TextField>
        </Informations>

        <Informations>
          <TextField
            id={'link'}
            label={'Link URL'}
            placeholder={'www.link-da-noticia/123456'}
            className={classes.input}
            required
            fullWidth
            margin={'normal'}
            variant={'outlined'}
            value={link}
            onChange={(e) => setLink(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position={'start'}>
                  <LinkIcon />
                </InputAdornment>
              ),
            }}
          />
        </Informations>

        <Informations>
          <TextField
            id={'tags'}
            label={'Tags'}
            placeholder={'ex: Palestra, Escola, Educação...'}
            className={classes.input}
            required
            fullWidth
            margin={'normal'}
            variant={'outlined'}
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position={'start'}>
                  <LocalOfferIcon />
                </InputAdornment>
              ),
            }}
          />
        </Informations>

        <Informations>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
            <KeyboardDatePicker
              id={'date'}
              autoOk
              variant={'inline'}
              inputVariant={'outlined'}
              label={'Data'}
              format={'dd/MM/yyyy'}
              value={time}
              className={classes.input}
              InputAdornmentProps={{ position: 'end' }}
              onChange={(date) => setTime(date)}
            />
          </MuiPickersUtilsProvider>
        </Informations>

        <Divider className={classes.divider} />

        {Object.keys(contents).map(renderContent)}

        <AddContentMenu onClick={addNewContent} />

        <SaveArea>
          <Button
            variant={'contained'}
            size={'large'}
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={saveNews}
          >
            Salvar
          </Button>
        </SaveArea>
      </News>
    </Container>
  );
}

const useStyles = makeStyles({
  input: {
    margin: '8px',
  },
  divider: {
    margin: '16px 0px',
  },
  img: {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
  },
  icon: {
    margin: '8px',
  },
  button: {
    color: '#fff',
    backgroundColor: '#4CAF50',
    '&:hover': {
      backgroundColor: '#81c784',
    },
  },
});
