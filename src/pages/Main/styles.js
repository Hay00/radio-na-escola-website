import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Title = styled(Typography).attrs(() => ({
  variant: 'h4',
}))`
  text-align: center;
  margin-top: 24px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
  justify-content: center;
  align-items: center;
  gap: 2rem;

  @media (min-width: 768px) {
    margin: 0px 30px;
  }
`;
