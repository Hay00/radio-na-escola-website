import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
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
