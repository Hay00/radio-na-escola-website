import styled from 'styled-components';

export const Container = styled.div`
  ${({ avatar }) => (avatar ? 'width: 100%;' : '')}
  margin: 8px;
`;

export const Image = styled.div`
  display: flex;
  justify-content: center;

  transition: opacity 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  :hover {
    opacity: 0.6;
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

  background-color: #eee;

  transition: opacity 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  :hover {
    opacity: 0.6;
    cursor: pointer;
  }
`;
