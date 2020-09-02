import styled from 'styled-components';

export const Container = styled.main`
  @media (min-width: 600px) {
    max-width: 768px;
    padding-left: 24px;
    padding-right: 24px;
  }
  margin: auto;
`;

export const News = styled.div`
  display: flex;
  margin-top: 64px;
  flex-direction: column;
`;

export const Title = styled.div`
  display: inline-flex;
  align-items: center;
  margin: 8px 10px;
`;

export const Url = styled.div`
  display: inline-flex;
  align-items: center;
  margin: 8px 10px;
`;

export const Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px;
`;

export const Informations = styled.div`
  display: flex;
  align-items: center;
  justify-content: baseline;
  max-width: 500px;
  margin: 8px 10px;
`;

export const SaveArea = styled.div`
  display: flex;
  margin: 28px 0px;
  justify-content: center;
`;
