import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export const Container = styled.main`
  @media (min-width: 600px) {
    max-width: 768px;
    padding: 0px 24px;
  }
  margin: auto;
`;

export const News = styled.div`
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

export const TextInput = styled(TextField).attrs(() => ({
  required: true,
  fullWidth: true,
  variant: 'outlined',
}))`
  margin: 8px;
`;

export const Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px;
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
