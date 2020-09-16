import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 600px) {
    padding: 0px 24px;
  }
  margin: 10px auto;
  max-width: 768px;
`;

export const Input = styled.div`
  display: inline-flex;
  align-items: center;
  margin: 8px 10px;
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px;
`;

export const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

export const Save = styled.div`
  display: flex;
  margin: 28px 0px;
  justify-content: center;
`;

export const SaveButton = styled(Button)`
  && {
    color: #fff;
    background-color: #4caf50;
    &:hover {
      background-color: #81c784;
    }
  }
`;
