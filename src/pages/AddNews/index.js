import React, { useEffect, useState } from 'react';

// Componentes material-ui
import DateFnsUtils from '@date-io/date-fns';
import Divider from '@material-ui/core/Divider';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import LinkIcon from '@material-ui/icons/Link';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import SaveIcon from '@material-ui/icons/Save';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { ptBR } from 'date-fns/locale';

// Componentes locais
import ImagePicker from '../../components/ImagePicker';
import TextEditor from '../../components/TextEditor';

// Firebase
import { db } from '../../config/firebaseConfig';
import Firebase from '../../utils/firebaseFunctions';

import {
  Container,
  LargeInput,
  News,
  Save,
  SaveButton,
  SmallInput,
  TextInput,
} from './styles';

const initialText = [{ type: 'paragraph', children: [{ text: '' }] }];
const initialSchools = [{ id: 'none', name: 'Nenhuma' }];
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
  {
    type: 'outros',
    title: 'Outros',
  },
];

export default function AddNews({ history, location, match }) {
  const edit = match.path === '/noticias/edit/:id';
  const [docId, setDocId] = useState(location?.state?.docId || null);

  const [input, setInput] = useState({
    title: '',
    image: '',
    category: categories[0].type,
    link: '',
    schoolId: initialSchools[0].id,
    tags: '',
    createdAt: new Date(),
  });

  const [inputError, setInputError] = useState({
    title: false,
    image: false,
    category: false,
    link: false,
    schoolId: false,
    tags: false,
    createdAt: false,
  });

  const [text, setText] = useState(initialText);

  const [schools, setSchools] = useState(initialSchools);

  /**
   * Busca as escolas
   */
  useEffect(() => {
    async function getSchools() {
      const data = await Firebase.getAllSchools();
      data.unshift({ id: 'none', name: 'Nenhuma' });
      setSchools(data);
    }
    async function fetchNews() {
      let data = [];
      if (docId) {
        data = await Firebase.findNews(docId);
      } else {
        data = await Firebase.findNewsWithURL(match.params.id);
        data = data[0];
        setDocId(data.docId);
      }
      if (data) {
        const date = new Date(new Date().constructor(data.createdAt));
        const inputValues = { ...data, createdAt: date };
        delete inputValues.content;
        setInput(inputValues);
        setText(data.content);
      }
    }

    getSchools();
    if (edit) {
      fetchNews();
    }
  }, [docId, edit, match.params.id]);

  /**
   * Salva o que o usuário modificou (title, image, category...)
   *
   * @param {Event} event evento que contém o novo valor
   */
  function handleChange(event) {
    setInput({ ...input, [event.target.name]: event.target.value });
  }

  /**
   * Salva a data que o usuário modificou
   *
   * @param {Date} date data
   */
  function handleTimeChange(date) {
    setInput({ ...input, createdAt: date });
  }

  /**
   * Cria um id usando a data + título
   *
   * ex: 01/01/2000/um-titulo
   *
   * @returns id
   */
  function createId() {
    const identifier = input.title
      .normalize('NFD')
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/ /g, '-')
      .toLowerCase();

    let date = input.createdAt.toLocaleDateString().replace(/(\/)/g, '-');
    return date + '-' + identifier;
  }

  /**
   * Valida os campos de texto
   *
   * @returns Boolean
   */
  function validateInputs() {
    let valid = true;
    let errors = {};
    for (const value in input) {
      if (Object.hasOwnProperty.call(input, value)) {
        const element = input[value];
        if (element) {
          errors = { ...errors, [value]: false };
        } else {
          errors = { ...errors, [value]: true };
          valid = false;
        }
      }
    }
    setInputError(errors);
    return valid;
  }

  /**
   * Salva a noticia no Firestore
   */
  function saveNews() {
    if (validateInputs()) {
      const { createdAt } = input;

      const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      let stringDate = createdAt.toLocaleDateString('pt-BR', dateOptions);

      const obj = {
        about: text[0]?.children[0]?.text,
        content: text,
        date: stringDate,
        id: createId(),
        ...input,
      };

      if (edit) {
        db.collection('noticias')
          .doc(docId)
          .update(obj)
          .then(history.push('/noticias'));
      } else {
        db.collection('noticias').add(obj).then(history.push('/noticias'));
      }
    } else {
      window.scrollTo(0, 0);
    }
  }

  return (
    <Container>
      <News>
        <LargeInput>
          <TextInput
            id={'title'}
            name={'title'}
            label={'Título da Notícia'}
            multiline
            rowsMax={4}
            error={inputError.title}
            value={input.title}
            onChange={handleChange}
          />
        </LargeInput>

        <LargeInput>
          <ImagePicker
            id={'main-image'}
            placeHolder={'Adicione a imagem principal'}
            error={inputError.image}
            value={input.image}
            onChange={handleChange}
          />
        </LargeInput>

        <SmallInput>
          <TextField
            id={'category'}
            name={'category'}
            label={'Categoria'}
            style={{ margin: '8px' }}
            select
            required
            fullWidth
            variant={'outlined'}
            error={inputError.category}
            value={input.category}
            onChange={handleChange}
          >
            {categories.map(({ title, type }) => (
              <MenuItem key={type} value={type}>
                {title}
              </MenuItem>
            ))}
          </TextField>
        </SmallInput>

        <SmallInput>
          <TextField
            id={'schoolId'}
            name={'schoolId'}
            label={'Escola Relacionada'}
            style={{ margin: '8px' }}
            select
            required
            fullWidth
            variant={'outlined'}
            error={inputError.schoolId}
            value={input.schoolId}
            onChange={handleChange}
          >
            {schools.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </TextField>
        </SmallInput>

        <SmallInput>
          <TextInput
            id={'link'}
            name={'link'}
            label={'Link URL'}
            placeholder={'www.link-da-noticia/123456'}
            error={inputError.link}
            value={input.link}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position={'start'}>
                  <LinkIcon />
                </InputAdornment>
              ),
            }}
          />
        </SmallInput>

        <SmallInput>
          <TextInput
            id={'tags'}
            name={'tags'}
            label={'Tags'}
            placeholder={'ex: Palestra, Escola, Educação...'}
            error={inputError.tags}
            value={input.tags}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position={'start'}>
                  <LocalOfferIcon />
                </InputAdornment>
              ),
            }}
          />
        </SmallInput>

        <SmallInput>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
            <KeyboardDatePicker
              id={'date'}
              name={'date'}
              autoOk
              variant={'inline'}
              inputVariant={'outlined'}
              label={'Data'}
              format={'dd/MM/yyyy'}
              error={inputError.createdAt}
              value={input.createdAt}
              style={{ margin: '8px' }}
              InputAdornmentProps={{ position: 'end' }}
              onChange={handleTimeChange}
            />
          </MuiPickersUtilsProvider>
        </SmallInput>

        <Divider style={{ margin: '16px 0px' }} />

        <TextEditor text={text} setText={setText} />

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
