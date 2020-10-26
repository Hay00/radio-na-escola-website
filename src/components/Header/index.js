import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { Link } from 'react-router-dom';

import { AuthContext } from '../../auth';
import { app } from '../../config/firebaseConfig';
import { User } from './styles';

export default function Header() {
  const classes = useStyles();

  const { currentUser } = useContext(AuthContext);

  function singOut() {
    app.auth().signOut();
  }

  return (
    <div className={classes.root}>
      <AppBar position={'fixed'}>
        <Toolbar>
          <IconButton
            edge={'start'}
            className={classes.menuButton}
            color={'inherit'}
            aria-label={'menu'}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant={'h6'} className={classes.title}>
            News
          </Typography>
          {!currentUser ? (
            <Button
              variant={'contained'}
              color={'secondary'}
              component={Link}
              to={'login'}
            >
              Entrar
            </Button>
          ) : (
            <User>
              <Typography className={classes.item} variant="h6" gutterBottom>
                {currentUser.email}
              </Typography>
              <Button
                className={classes.item}
                variant={'contained'}
                color={'secondary'}
                onClick={singOut}
              >
                Sair
              </Button>
            </User>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  item: {
    margin: '0px 10px',
  },
}));
