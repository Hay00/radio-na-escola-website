import styled from 'styled-components';

import Button from '@material-ui/core/Button';

export const LoginButton = styled(Button).attrs(() => ({
  variant: 'contained',
  color: 'secondary',
}))`
  margin: auto;
  margin-right: 0px;
`;

export const User = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 300px;
  margin: 0 auto;
  margin-right: 0px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
