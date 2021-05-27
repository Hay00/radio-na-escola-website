import styled from 'styled-components';
import { Card, CardActions, Typography } from '@material-ui/core/';

export const Container = styled.div`
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;

export const MyCard = styled(Card)`
  max-width: 560px;
`;

export const Actions = styled(CardActions)`
  padding: 8px 16px;
  align-items: center;
`;

export const Title = styled(Typography)`
  && {
    line-height: 26px;
  }
`;

export const About = styled(Typography)`
  text-justify: distribute;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
