import React, { useEffect, useMemo, useState } from 'react';

import DateFnsUtils from '@date-io/date-fns';

import {
  Divider,
  InputAdornment,
  MenuItem,
  TextField,
} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import SaveIcon from '@material-ui/icons/Save';

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { ptBR } from 'date-fns/locale';

import AddContentMenu from '../../components/AddContentMenu';
import ImagePicker from '../../components/ImagePicker';
import RenderContent from '../../components/RenderContent';

import { db } from '../../config/firebaseConfig';

import {
  Container,
  Information,
  LargeInput,
  News,
  Save,
  SaveButton,
} from './styles';

export default function AddNews({ history }) {
  const [values, setValues] = useState({
    title: '',
    image: '',
    category: 'empreendedorismo',
    link: '',
    schoolId: 'none',
    tags: '',
    createdAt: new Date(),
  });

  const [contents, setContent] = useState([]);

  const [schools, setSchools] = useState([{ id: 'none', name: 'Nenhuma' }]);

  /**
   * Busca as escolas
   */
  useEffect(() => {
    db.collection('escolas')
      .orderBy('name', 'asc')
      .get()
      .then((querySnapshot) => {
        const tempList = [];
        tempList.push({ id: 'none', name: 'Nenhuma' });
        querySnapshot.forEach((doc) => {
          tempList.push(doc.data());
        });
        setSchools(tempList);
      });
  }, []);

  const categories = [
    {
      type: 'empreendedorismo',
      title: 'Empreendedorismo',
    },
    {
      type: 'comunicacao',
      title: 'Comunicação',
    },
    {
      type: 'tecnologia',
      title: 'Tecnologia',
    },
  ];

  /**
   * Salva o que o usuário modificou (title, image, category...)
   *
   * @param {String} prop qual o item que está sendo alterado
   * @param {Event} event evento que contém o novo valor
   */
  function handleChange(prop, event) {
    setValues({ ...values, [prop]: event.target.value });
  }

  /**
   * Salva a data que o usuário modificou
   *
   * @param {Date} date data
   */
  function handleTimeChange(date) {
    setValues({ ...values, time: date });
  }

  /**
   * Gerencia a mudança do conteúdo dos itens
   *
   * @param {String} key índice do item
   * @param {Event} event evento relacionado ao componente (nome, valor)
   */
  function handleContentChange(key, event) {
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
    setContent([...contents, { [type]: '' }]);
  }

  /**
   * Remove um item usando um índice
   *
   * @param {String} key índice do item
   */
  function removeContent(key) {
    let dummyState = [...contents];
    dummyState.splice(key, 1);
    setContent(dummyState);
  }

  /**
   * Move o item para certo índice
   *
   * @param {Number} from índice inicial
   * @param {Number} to índice de destino
   */
  function moveContent(from, to) {
    let dummyState = [...contents];
    let aux = dummyState[to];
    dummyState[to] = dummyState[from];
    dummyState[from] = aux;
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
        handleContentChange={(key, evt) => handleContentChange(key, evt)}
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

    let date = values.createdAt.toLocaleDateString().replace(/(\/)/g, '-');
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
    const { createdAt } = values;
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const stringDate = createdAt.toLocaleDateString('pt-BR', dateOptions);
    db.collection('noticias')
      .add({
        about: getFirstText(),
        content: contents,
        date: stringDate,
        id: createId(),
        ...values,
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
            style={{ margin: '8px' }}
            required
            fullWidth
            multiline
            rowsMax={4}
            margin={'normal'}
            variant={'outlined'}
            value={values.title}
            onChange={(e) => handleChange('title', e)}
          />
        </LargeInput>

        <LargeInput>
          <ImagePicker
            placeHolder={'Adicione a imagem principal'}
            value={values.image}
            onChange={(e) => handleChange('image', e)}
          />
        </LargeInput>

        <Information>
          <TextField
            id={'category'}
            label={'Categoria'}
            style={{ margin: '8px' }}
            select
            required
            fullWidth
            variant={'outlined'}
            value={values.category}
            onChange={(e) => handleChange('category', e)}
          >
            {categories.map(({ title, type }) => (
              <MenuItem key={type} value={type}>
                {title}
              </MenuItem>
            ))}
          </TextField>
        </Information>

        <Information>
          <TextField
            id={'schoolId'}
            label={'Escola Relacionada'}
            style={{ margin: '8px' }}
            select
            required
            fullWidth
            variant={'outlined'}
            value={values.schoolId}
            onChange={(e) => handleChange('schoolId', e)}
          >
            {schools.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </TextField>
        </Information>

        <Information>
          <TextField
            id={'link'}
            label={'Link URL'}
            placeholder={'www.link-da-noticia/123456'}
            style={{ margin: '8px' }}
            required
            fullWidth
            margin={'normal'}
            variant={'outlined'}
            value={values.link}
            onChange={(e) => handleChange('link', e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position={'start'}>
                  <LinkIcon />
                </InputAdornment>
              ),
            }}
          />
        </Information>

        <Information>
          <TextField
            id={'tags'}
            label={'Tags'}
            placeholder={'ex: Palestra, Escola, Educação...'}
            style={{ margin: '8px' }}
            required
            fullWidth
            margin={'normal'}
            variant={'outlined'}
            value={values.tags}
            onChange={(e) => handleChange('tags', e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position={'start'}>
                  <LocalOfferIcon />
                </InputAdornment>
              ),
            }}
          />
        </Information>

        <Information>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
            <KeyboardDatePicker
              id={'date'}
              autoOk
              variant={'inline'}
              inputVariant={'outlined'}
              label={'Data'}
              format={'dd/MM/yyyy'}
              value={values.createdAt}
              style={{ margin: '8px' }}
              InputAdornmentProps={{ position: 'end' }}
              onChange={handleTimeChange}
            />
          </MuiPickersUtilsProvider>
        </Information>

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
