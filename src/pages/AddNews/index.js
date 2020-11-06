import React from 'react';

import {
  Container,
  News,
  LargeInput,
  Informations,
  Save,
  SaveButton,
} from './styles';

import {
  TextField,
  makeStyles,
  Divider,
  InputAdornment,
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
import RenderContent from '../../components/RenderContent';

import { db } from '../../config/firebaseConfig';
import ImagePicker from '../../components/ImagePicker';

export default function AddNews({ history }) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    title: '',
    image: '',
    category: 'Empreendedorismo',
    link: '',
    tags: '',
    time: new Date(),
  });

  const [contents, setContent] = React.useState([]);

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
   * Salva o que o usuário modificou (title, image, category...)
   *
   * @param {*} prop qual o item que está sendo alterado
   * @param {*} event evento que contém o novo valor
   */
  const handleChange = (prop) => (event) => {
    console.log('handleChange');
    setValues({ ...values, [prop]: event.target.value });
  };

  /**
   * Salva a data que o usuário modificou
   *
   * @param {*} date data
   */
  const handleTimeChange = (date) => {
    setValues({ ...values, time: date });
  };

  /**
   * Gerencia a mudança do conteúdo dos itens
   *
   * @param {*} event evento relacionado ao componente (nome, valor)
   * @param {*} key índice do item
   */
  const handleContentChange = (key) => (event) => {
    console.log(key);
    console.log(event.target.name);
    let dummyState = [...contents];
    dummyState[key][event.target.name] = event.target.value;
    setContent(dummyState);
  };

  /**
   * Adiciona um novo item
   *
   * @param {*} type tipo de item
   */
  function addNewContent(type) {
    setContent([...contents, { [type]: '' }]);
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
   * Renderiza o conteúdo (subtítulo, texto, imagem)
   *
   * @param {*} key índice/key do item
   * @returns o componente
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
    let lowerTitle = values.title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[,.]/g, '');

    let date = values.time.toLocaleDateString().replace(/(\/)/g, '-');
    return date + '-' + lowerTitle;
  }

  /**
   * Pega o primeiro elemento de texto para colocar no about do card
   *
   * @returns um objeto contento texto { texto: ' ... ' }
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
        category: values.category,
        content: contents,
        date: values.time.toLocaleDateString('pt-BR', dateOptions),
        createdAt: values.time,
        id: createId(),
        image: values.image,
        link: values.link,
        tags: values.tags,
        title: values.title,
      })
      .then(history.push('/noticias'));
  }

  return (
    <Container>
      <News>
        <LargeInput>
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
            value={values.title}
            onChange={handleChange('title')}
          />
        </LargeInput>

        <LargeInput>
          <ImagePicker
            placeHolder={'Adicione a imagem principal'}
            value={values.image}
            onChange={handleChange('image')}
          />
        </LargeInput>

        <Informations>
          <TextField
            id={'category'}
            label={'Categoria'}
            className={classes.input}
            select
            required
            fullWidth
            variant={'outlined'}
            value={values.category}
            onChange={handleChange('category')}
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
            value={values.link}
            onChange={handleChange('link')}
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
            value={values.tags}
            onChange={handleChange('tags')}
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
              value={values.time}
              className={classes.input}
              InputAdornmentProps={{ position: 'end' }}
              onChange={handleTimeChange}
            />
          </MuiPickersUtilsProvider>
        </Informations>

        <Divider style={{ margin: '16px 0px' }} />

        {Object.keys(contents).map(renderContent)}

        <AddContentMenu onClick={addNewContent} />

        <Save>
          <SaveButton
            variant={'contained'}
            size={'large'}
            startIcon={<SaveIcon />}
            onClick={saveNews}
          >
            Salvar
          </SaveButton>
        </Save>
      </News>
    </Container>
  );
}

const useStyles = makeStyles({
  input: {
    margin: '8px',
  },
  img: {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
  },
});
