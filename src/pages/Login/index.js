import React, { useCallback, useState, useContext } from 'react';

import { Typography, TextField, Button } from '@material-ui/core';

import { Container, Form } from './styles';
import { auth } from '../../config/firebaseConfig';

import { AuthContext } from '../../auth';
import { Redirect } from 'react-router-dom';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(
    async (val) => {
      val.preventDefault();

      const { email, password } = val.target.elements;

      try {
        await auth.signInWithEmailAndPassword(email.value, password.value);
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to={'/'} />;
  }

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <Typography component={'h1'} variant={'h5'}>
          Entrar
        </Typography>
        <TextField
          variant={'outlined'}
          margin={'normal'}
          required
          fullWidth
          id={'email'}
          label={'Email'}
          name={'email'}
          autoComplete={'email'}
          autoFocus
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <TextField
          variant={'outlined'}
          margin={'normal'}
          required
          fullWidth
          name={'password'}
          label={'Senha'}
          type={'password'}
          id={'password'}
          autoComplete={'current-password'}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button
          type={'submit'}
          fullWidth
          variant={'contained'}
          color={'primary'}
          style={{ margin: '24px 0px 16px' }}
        >
          Entrar
        </Button>
      </Form>
    </Container>
  );
}
