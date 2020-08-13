import { createMuiTheme } from '@material-ui/core/styles';

export default {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    accent: '#ff8126',
    backdrop: 'rgba(30, 30, 30, 1)',
    primary: '#ff8126',
  },
};
