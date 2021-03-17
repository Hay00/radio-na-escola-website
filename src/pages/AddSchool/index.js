import Firebase from '../../utils/firebaseFunctions';

// Componentes material-ui
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import React, { useEffect, useState } from 'react';

// Componentes locais
import Alert from '../../components/Alert';
import ImagePicker from '../../components/ImagePicker';
import Podcast from '../../components/Podcast';

// Firebase
import { db } from '../../config/firebaseConfig';

import { Container, Input, PodcastContainer, Save, SaveButton } from './styles';

export default function AddSchool({ history, location, match }) {
  const edit = match.path === '/escolas/edit/:id';
  const [docId, setDocId] = useState(location?.state?.docId || null);

  const [values, setValues] = useState({
    name: '',
    image: '',
    radioLink: '',
    radioName: '',
  });

  const [podcasts, setPodcasts] = useState([]);

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  useEffect(() => {
    async function getSchools() {
      let data = [];
      if (docId) {
        data = await Firebase.findSchool(docId);
      } else {
        data = await Firebase.findSchoolWithURL(match.params.id);
        data = data[0];
        setDocId(data.docId);
      }

      if (data) {
        const obj = {
          name: data.name,
          image: data.image,
          radioLink: data.radioLink,
          radioName: data.radioName,
        };
        setValues(obj);
        if (data.podcasts) {
          const result = data.podcasts.map((element) => {
            const date = new Date(new Date().constructor(element.createdAt));
            return { ...element, createdAt: date };
          });
          setPodcasts(result);
        }
      }
    }
    if (edit) {
      getSchools();
    }
  }, [docId, edit, match.params.id]);

  /**
   * Salva o que o usuário modificou (title, image, category...)
   *
   * @param {String} prop qual o item que está sendo alterado
   * @param {Event} event evento que contém o novo valor
   */
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  /**
   * Cria um id a partir das informações disponibilizadas
   * @returns id da escola
   */
  function createId() {
    let name = values.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[,.]/g, '');

    let radioName = values.radioName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[,.]/g, '');

    return name + '-' + radioName;
  }

  /**
   * Salva a escola no Firestore
   */
  function saveSchool() {
    const obj = {
      id: createId(),
      podcasts: podcasts,
      ...values,
    };
    if (edit) {
      db.collection('escolas')
        .doc(docId)
        .update(obj)
        .then(history.push('/escolas'));
    } else {
      db.collection('escolas').add(obj).then(history.push('/escolas'));
    }
  }

  /**
   * Adiciona um novo podcast
   */
  function addPodcast() {
    const date = new Date();
    setPodcasts([
      ...podcasts,
      {
        title: '',
        about: '',
        duration: '',
        createdAt: date,
        date: date.toLocaleDateString('pt-BR', dateOptions),
        link: '',
      },
    ]);
  }

  /**
   * Remove um por índice podcast
   * @param {Number} key índice do podcast a ser removido
   */
  function removePodcast(key) {
    let dummyState = [...podcasts];
    dummyState.splice(key, 1);
    setPodcasts(dummyState);
  }

  /**
   * Altera algum valor do podcast
   * @param {Number} key  índice do podcast
   */
  const handlePodcastChange = (key) => (event) => {
    let dummyState = [...podcasts];
    dummyState[key][event.target.name] = event.target.value;
    setPodcasts(dummyState);
  };

  /**
   * Salva a data que o usuário modificou
   *
   * @param {Number} key índice do podcast
   * @param {Date} date data
   */
  const handleTimeChange = (key) => (date) => {
    let dummyState = [...podcasts];
    dummyState[key]['createdAt'] = date;
    dummyState[key]['date'] = date.toLocaleDateString('pt-BR', dateOptions);
    setPodcasts(dummyState);
  };

  /**
   * Renderiza o conteúdo (subtítulo, texto, imagem)
   *
   * @param {Number} key índice/key do item
   * @returns o componente
   */
  function renderPodcasts(key) {
    const { title, about, duration, createdAt, date, link } = podcasts[key];
    return (
      <div key={key}>
        <Divider style={{ margin: '16px 0px' }} />
        <Podcast
          index={parseInt(key, 10)}
          title={title}
          about={about}
          duration={duration}
          createdAt={createdAt}
          date={date}
          link={link}
          handlePodcastChange={handlePodcastChange}
          removePodcast={removePodcast}
          handleTimeChange={handleTimeChange}
        />
      </div>
    );
  }

  return (
    <Container>
      <Input>
        <TextField
          id={'school-name'}
          label={'Nome da Escola'}
          style={{ margin: '8px', fontSize: '30px' }}
          required
          fullWidth
          margin={'normal'}
          variant={'outlined'}
          value={values.name}
          onChange={handleChange('name')}
        />
      </Input>

      <Input>
        <ImagePicker
          id={'main'}
          placeHolder={'Adicione a imagem principal'}
          value={values.image}
          onChange={handleChange('image')}
        />
      </Input>

      {values.image.length === 0 ? <Alert>Insira uma imagem!</Alert> : null}

      <Input>
        <TextField
          id={'school-radioName'}
          label={'Nome da rádio'}
          style={{ margin: '8px' }}
          required
          fullWidth
          margin={'normal'}
          variant={'outlined'}
          value={values.radioName}
          onChange={handleChange('radioName')}
        />
      </Input>

      <Input>
        <TextField
          id={'school-radioLink'}
          label={'Link da rádio (URL)'}
          style={{ margin: '8px' }}
          required
          fullWidth
          margin={'normal'}
          variant={'outlined'}
          value={values.radioLink}
          onChange={handleChange('radioLink')}
        />
      </Input>

      {Object.keys(podcasts).map(renderPodcasts)}

      <PodcastContainer>
        <Fab variant={'extended'} color={'primary'} onClick={addPodcast}>
          <AddIcon style={{ marginRight: '8px' }} />
          Podcast
        </Fab>
      </PodcastContainer>

      <Save>
        <SaveButton
          variant={'contained'}
          size={'large'}
          startIcon={<SaveIcon />}
          onClick={saveSchool}
        >
          Salvar
        </SaveButton>
      </Save>
    </Container>
  );
}
