import styled from 'styled-components';
import { Typography } from '@material-ui/core/';

export const Container = styled.div`
  display: flex;
  justify-content: center;
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
