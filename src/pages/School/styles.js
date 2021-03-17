import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled(Typography)`
  max-width: 100%;
  padding: 16px 20px;
  word-wrap: break-word;
`;

export const Image = styled.img`
  display: flex;
  max-width: 100%;
  max-height: 200px;
  margin: auto;
  padding-bottom: 10px;
`;
