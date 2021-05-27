import styled from 'styled-components';

export const Container = styled.div`
  margin: 8px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 10px;
`;
export const SchoolsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
  grid-auto-rows: 560px;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  @media (min-width: 768px) {
    margin: 0px 30px;
  }
`;
