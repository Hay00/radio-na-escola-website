import { Divider, Paper } from '@material-ui/core';
import { Editable } from 'slate-react';
import styled from 'styled-components';

export const Container = styled(Paper)`
  margin: 16px 8px;
  padding: 16px;
`;

export const ToolBar = styled.div`
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 8px;
  border-bottom: 2px solid #eee;
`;

export const Button = styled.button`
  color: ${({ active }) => (active ? 'black' : '#ccc')};
  background-color: ${({ active }) => (active ? '#eee' : '#fff')};

  margin-left: 4px;
  padding: 4px 4px 2px;
  border-radius: 4px;
  transition: background-color 0.1s ease-out;

  &:hover {
    background-color: #eee;
  }
`;

export const Separator = styled(Divider).attrs(() => ({
  orientation: 'vertical',
  variant: 'middle',
  flexItem: true,
}))`
  margin: 0px 6px 0px 8px;
`;

export const EditableArea = styled(Editable)`
  padding: 8px 16px 20px;
`;

export const Image = styled.img`
  display: block;
  max-width: 100%;
  max-height: 30em;
  margin: 1em auto 0px;
  box-shadow: ${({ selected, focused }) =>
    selected && focused ? '0 0 0 3px #B4D5FF' : 'none'};
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

export const H1 = styled.h1`
  margin-top: 1em;
  margin-bottom: 8px;
`;

export const H2 = styled.h2`
  margin-top: 1em;
  margin-bottom: 8px;
`;

export const ListNumber = styled.ol`
  margin-top: 1em;
  padding-left: 1em;
`;

export const Text = styled.p`
  margin-top: 1em;
`;
