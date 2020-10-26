import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const Container = styled.div`
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;

export const Title = styled(Typography)`
  && {
    line-height: 26px;
  }
`;

export const Image = styled.img`
  max-width: 320px;
  object-fit: scale-down;
  padding: 0px 20px;
  display: flex;
  margin: 8px auto;
`;

export const About = styled(Typography)`
  text-justify: distribute;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
