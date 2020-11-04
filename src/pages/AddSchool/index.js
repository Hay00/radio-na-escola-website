import React, { useState } from 'react';

import { Container, Input, PodcastContainer, Save, SaveButton } from './styles';
import { Divider, Fab, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';

import { db } from '../../config/firebaseConfig';
import Alert from '../../components/Alert';
import ImagePicker from '../../components/ImagePicker';
import Podcast from '../../components/Podcast';

export default function AddSchool({ history }) {
  const [values, setValues] = useState({
    name: '',
    image: '',
    radioLink: '',
    radioName: '',
  });

  const [podcasts, setPodcasts] = useState([]);

  /**
   * Salva o que o usuário modificou (title, image, category...)
   *
   * @param {*} prop qual o item que está sendo alterado
   * @param {*} event evento que contém o novo valor
   */
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

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
    db.collection('escolas')
      .add({
        id: createId(),
        name: values.name,
        image: values.image,
        radioLink: values.radioLink,
        radioName: values.radioName,
        podcasts: podcasts,
      })
      .then(history.push('/escolas'));
  }

  function addPodcast() {
    setPodcasts([
      ...podcasts,
      { title: '', about: '', createdAt: new Date(), link: '' },
    ]);
  }

  function removePodcast(key) {
    let dummyState = [...podcasts];
    dummyState.splice(key, 1);
    setPodcasts([]);
    setPodcasts(dummyState);
  }

  const handlePodcastChange = (key) => (event) => {
    let dummyState = [...podcasts];
    dummyState[key][event.target.name] = event.target.value;
    setPodcasts(dummyState);
  };

  /**
   * Salva a data que o usuário modificou
   *
   * @param {*} key índice do podcast
   * @param {*} date data
   */
  const handleTimeChange = (key) => (date) => {
    let dummyState = [...podcasts];
    dummyState[key]['createdAt'] = date;
    setPodcasts(dummyState);
  };

  /**
   * Renderiza o conteúdo (subtítulo, texto, imagem)
   *
   * @param {*} key índice/key do item
   * @returns o componente
   */
  function renderPodcasts(key) {
    return (
      <div key={key}>
        <Divider style={{ margin: '16px 0px' }} />
        <Podcast
          index={parseInt(key, 10)}
          title={podcasts[key].title}
          about={podcasts[key].about}
          createdAt={podcasts[key].createdAt}
          link={podcasts[key].link}
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
        <Fab variant="extended" color={'primary'} onClick={addPodcast}>
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
