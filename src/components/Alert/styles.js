import styled from 'styled-components';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 8px 16px;
  border-radius: 4px;
  padding: 8px 16px;
  background-color: #fff4e5;
`;

export const AlertIcon = styled(ReportProblemOutlinedIcon)`
  color: #ff9800;
  padding: 4px 0;
  margin-right: 8px;
`;
