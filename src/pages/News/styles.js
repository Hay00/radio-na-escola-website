import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f6f6f6;
`;

export const NewsContainer = styled.div`
  max-width: 768px;
  margin: auto;
`;

export const Title = styled(Typography)`
  max-width: 100%;
  padding: 10px 20px;
  word-wrap: break-word;
`;

export const H1 = styled.h1`
  margin-top: 1em;
  margin-bottom: 16px;
`;

export const H2 = styled.h2`
  margin-top: 1em;
  margin-bottom: 16px;
`;

export const Quote = styled.blockquote`
  color: #999;
  border-left: 2px solid #ddd;
  padding-left: 1em;
`;

export const ListItem = styled.ul`
  list-style: disc;
  margin-top: 1em;
  padding-left: 1em;
`;

export const ListNumber = styled.ol`
  margin-top: 1em;
  padding-left: 1em;
`;

export const Text = styled.p`
  margin: 8px 0px;
`;

export const Image = styled.img`
  display: flex;
  max-width: 100%;
  margin: auto;
  padding-bottom: 10px;
`;

export const Information = styled.div`
  display: flex;
  flex-direction: row;
  margin: 8px 20px;
`;

export const Content = styled.div`
  padding: 0px 20px;
`;
