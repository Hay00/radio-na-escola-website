import React from 'react';

import { Container, Input, Save, SaveButton } from './styles';
import { TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import { db } from '../../config/firebaseConfig';
import Alert from '../../components/Alert';
import ImagePicker from '../../components/ImagePicker';

export default function AddSchool({ history }) {
  const [values, setValues] = React.useState({
    name: '',
    image: '',
    radioLink: '',
    radioName: '',
  });

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
      })
      .then(history.push('/escolas'));
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
