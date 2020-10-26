import styled from 'styled-components';

export const User = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 300px;
  margin: 0 auto;
  padding: 10px 0;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
