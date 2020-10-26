import React, { useCallback, useState, useContext } from 'react';

import { Typography, TextField, Button, makeStyles } from '@material-ui/core';

import { Container, Form } from './styles';
import { app } from '../../config/firebaseConfig';

import { AuthContext } from '../../auth';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login({ history }) {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChange(e) {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  }

  const handleLogin = useCallback(
    async (val) => {
      val.preventDefault();

      const { email, password } = val.target.elements;

      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
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
          onChange={handleChange}
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
          onChange={handleChange}
        />
        <Button
          type={'submit'}
          fullWidth
          variant={'contained'}
          color={'primary'}
          className={classes.submit}
        >
          Entrar
        </Button>
      </Form>
    </Container>
  );
}
