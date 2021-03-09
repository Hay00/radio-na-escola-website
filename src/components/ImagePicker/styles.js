import styled from 'styled-components';

export const Container = styled.div`
  margin: 8px;
  width: 100%;
`;

export const Image = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;

  transition: 0.2s ease-out;

  &:hover {
    background-color: #ccc;
    cursor: pointer;
  }
`;

export const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid;
  border-color: ${({ error }) => (error ? '#f44336' : '#0000003b')};
  border-width: 1px;
  border-radius: 4px;

  transition: 0.2s ease-out;
  background-color: #eee;

  &:hover {
    background-color: #ccc;
    cursor: pointer;
  }
`;
