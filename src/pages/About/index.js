import React, { useEffect, useState } from 'react';

import SaveIcon from '@material-ui/icons/Save';

import {
  Container,
  MiniCard,
  Title,
  TeamContainer,
  CardTitle,
  Save,
  SaveButton,
  TeamItem,
  AddButton,
  Sponsor,
} from './styles';

import { db } from '../../config/firebaseConfig';
import InputBase from '@material-ui/core/InputBase';

// Icons
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import ImagePicker from '../../components/ImagePicker';
import { IconButton } from '@material-ui/core';

export default function About({ history }) {
  const [hasChange, setHasChange] = useState(false);

  const [about, setAbout] = useState('');
  const [team, setTeam] = useState(null);
  const [sponsors, setSponsors] = useState(null);

  useEffect(() => {
    db.collection('sobre')
      .doc('sobreProjeto')
      .get()
      .then((doc) => {
        const { texto } = doc.data();
        if (doc.exists && texto) {
          setAbout(texto);
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });

    db.collection('sobre')
      .doc('time')
      .get()
      .then((doc) => {
        const time = doc.data();
        if (doc.exists && time) {
          setTeam(time);
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });

    db.collection('sobre')
      .doc('patrocinadores')
      .get()
      .then((doc) => {
        const { list } = doc.data();
        if (doc.exists && list) {
          setSponsors(list);
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }, []);

  /**
   * Salva as alterações ao digitar no sobre
   *
   * @param {Event} event evento
   */
  function onAboutChange({ target }) {
    setHasChange(true);
    setAbout(target.value);
  }

  /**
   * Altera os dados do time conforme passado
   *
   * @param {Event} target evento
   * @param {String} teamType onde o objeto está
   * @param {String} index índice do objeto
   * @param {String} type tipo do objeto
   */
  function handleTeamChange(target, teamType, index, type) {
    setHasChange(true);
    let obj = { ...team };
    obj[teamType]['content'][index][type] = target.value;
    setTeam(obj);
  }

  /**
   * Altera os dados do patrocinador
   *
   * @param {Event} target evento
   * @param {String} index índice do objeto
   */
  function handleSponsorChange(target, index) {
    setHasChange(true);
    let obj = [...sponsors];
    obj[index]['image'] = target.value;
    setSponsors(obj);
  }

  /**
   * Adiciona uma nova linha
   *
   * @param {String} teamType qual o tipo
   */
  function addRow(teamType) {
    setHasChange(true);
    let obj = { ...team };
    obj[teamType]['content'].push({ name: 'Insira um nome...', image: '' });
    setTeam(obj);
  }

  /**
   * Remove uma linha
   *
   * @param {String} teamType qual o tipo
   * @param {String} index o seu índice
   */
  function removeRow(teamType, index) {
    setHasChange(true);
    let obj = { ...team };
    obj[teamType]['content'].splice(index, 1);
    setTeam(obj);
  }

  /**
   * Adiciona um novo patrocinador
   */
  function addSponsor() {
    setHasChange(true);
    const id = Math.floor(Math.random() * Date.now());
    const obj = { id, image: '' };
    setSponsors([...sponsors, obj]);
  }

  /**
   * Remove um patrocinador
   *
   * @param {String} index o seu índice
   */
  function removeSponsor(index) {
    setHasChange(true);
    let obj = [...sponsors];
    obj.splice(index, 1);
    setSponsors(obj);
  }

  /**
   * Salva as alterações no firestore
   */
  function saveAbout() {
    db.collection('sobre')
      .doc('time')
      .update(team)
      .catch((error) => {
        console.log('Error getting document:', error);
      });
    db.collection('sobre')
      .doc('sobreProjeto')
      .update({ texto: about })
      .then(history.push('/'))
      .catch((error) => {
        console.log('Error getting document:', error);
      });
    db.collection('sobre')
      .doc('patrocinadores')
      .update({ list: sponsors })
      .then(history.push('/'))
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }

  /**
   * Renderiza uma linha com foto e nome da pessoa
   *
   * @param {String} id identificador do tipo
   * @param {Array} content array do conteúdo
   * @returns JSX
   */
  function renderRow(id, content = []) {
    return content.map(({ name, image }, key) => (
      <TeamItem key={key}>
        <ImagePicker
          avatar
          id={`person-${name}`}
          value={image}
          onChange={({ target }) => handleTeamChange(target, id, key, 'image')}
        />
        <InputBase
          style={{ marginLeft: 8 }}
          fullWidth
          multiline
          rowsMax={3}
          value={name}
          onChange={({ target }) => handleTeamChange(target, id, key, 'name')}
        />
        <IconButton onClick={() => removeRow(id, key)}>
          <DeleteIcon color="error" />
        </IconButton>
      </TeamItem>
    ));
  }

  /**
   * Renderiza o time do projeto
   *
   * @returns JSX
   */
  function renderTeam() {
    if (!team) return null;

    const { apoio, bolsistas, coordenador, professores } = team;
    return (
      <div>
        <div>
          <Title>{coordenador.type}</Title>
          <div>{renderRow('coordenador', coordenador.content)}</div>
          <AddButton onClick={() => addRow('coordenador')}>
            <AddIcon />
          </AddButton>
        </div>
        <div>
          <Title>{professores.type}</Title>
          <div>{renderRow('professores', professores.content)}</div>
          <AddButton onClick={() => addRow('professores')}>
            <AddIcon />
          </AddButton>
        </div>
        <div>
          <Title>{bolsistas.type}</Title>
          <div>{renderRow('bolsistas', bolsistas.content)}</div>
          <AddButton onClick={() => addRow('bolsistas')}>
            <AddIcon />
          </AddButton>
        </div>
        <div>
          <Title>{apoio.type}</Title>
          <div>{renderRow('apoio', apoio.content)}</div>
          <AddButton onClick={() => addRow('apoio')}>
            <AddIcon />
          </AddButton>
        </div>
      </div>
    );
  }

  /**
   * Renderiza os patrocinadores
   * @returns JSX
   */
  function renderSponsors() {
    if (!sponsors) return null;

    return sponsors.map(({ id, image }, key) => (
      <Sponsor key={id}>
        <ImagePicker
          id={id}
          value={image}
          onChange={({ target }) => handleSponsorChange(target, key)}
        />
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
          <IconButton onClick={() => removeSponsor(key)}>
            <DeleteIcon color="error" />
          </IconButton>
        </div>
      </Sponsor>
    ));
  }

  return (
    <Container>
      <MiniCard color={'#309cfa'}>
        <CardTitle>Sobre o Projeto</CardTitle>
        <InputBase
          style={{ color: '#fff' }}
          fullWidth
          multiline
          value={about}
          onChange={onAboutChange}
        />
      </MiniCard>
      <TeamContainer>
        <MiniCard>{renderTeam()}</MiniCard>
      </TeamContainer>
      <MiniCard>
        <Title>Apoiadores e Patrocinadores</Title>
        <div>{renderSponsors()}</div>
        <AddButton onClick={() => addSponsor()}>
          <AddIcon />
        </AddButton>
      </MiniCard>
      {hasChange && (
        <Save>
          <SaveButton
            variant={'contained'}
            size={'large'}
            startIcon={<SaveIcon />}
            onClick={saveAbout}
          >
            Salvar
          </SaveButton>
        </Save>
      )}
    </Container>
  );
}
