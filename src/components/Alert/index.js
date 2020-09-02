import React from 'react';
import { AlertIcon, Container } from './styles';

export default function Alert(props) {
  return (
    <Container>
      <AlertIcon fontSize={'large'} />
      {props.children}
    </Container>
  );
}
