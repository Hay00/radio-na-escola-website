import { Paper } from '@material-ui/core';
import styled from 'styled-components';

export const Container = styled(Paper).attrs(() => ({
  elevation: 2,
}))`
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LargeInput = styled.div`
  display: inline-flex;
  align-items: center;
  margin: 8px 10px;
`;

export const SmallInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: baseline;
  max-width: 500px;
  margin: 8px 10px;
`;
