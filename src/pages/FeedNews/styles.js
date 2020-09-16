import styled from 'styled-components';

export const Container = styled.div``;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 10px;
`;

export const NewsContainer = styled.div`
  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    margin: 0px 8vw;
  }
`;
