import { Button, IconButton } from '@material-ui/core';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 450px;
  margin: 20px auto;
`;

export const CardTitle = styled.h2`
  color: #fff;
  text-align: center;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const MiniCard = styled.div`
  align-items: center;
  align-content: center;
  margin: 8px 0px;
  padding: 30px;
  background-color: ${({ color }) => color || '#f6f6f6'};
  border-radius: 4px;
`;

export const Title = styled.p`
  color: #111;
  font-size: 20px;
  font-weight: bold;
  padding-top: 8px;
`;

export const TeamContainer = styled.div`
  border-radius: 4px;
  margin: 8px 0px;
`;

export const TeamItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 8px 0px;
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
`;

export const Sponsor = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 40px auto;
`;

export const Save = styled.div`
  display: flex;
  margin: 28px 0px;
  justify-content: center;
`;

export const AddButton = styled(IconButton)`
  display: flex;
  color: #fff;
  margin: 16px auto 2em;
  background-color: #4caf50;
  &:hover {
    background-color: #81c784;
  }
`;

export const SaveButton = styled(Button)`
  color: #fff;
  background-color: #4caf50;
  &:hover {
    background-color: #81c784;
  }
`;
