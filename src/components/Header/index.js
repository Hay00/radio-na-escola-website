import React, { useContext, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { Link as RouterLink } from 'react-router-dom';

import { AuthContext } from '../../auth';
import { app } from '../../config/firebaseConfig';
import { User } from './styles';

export default function Header() {
  const classes = useStyles();

  const [openMenu, setOpenMenu] = useState(false);

  const { currentUser } = useContext(AuthContext);

  function singOut() {
    app.auth().signOut();
    handleClose();
  }

  const handleClick = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const handleClose = () => {
    setOpenMenu(false);
  };

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
          <Typography className={classes.links}>
            <Link
              color={'inherit'}
              variant={'h6'}
              component={RouterLink}
              to={'/noticias'}
            >
              Notícias
            </Link>
            <Link
              color={'inherit'}
              variant={'h6'}
              component={RouterLink}
              to={'/escolas'}
            >
              Escolas
            </Link>
          </Typography>

          {!currentUser ? (
            <Button
              className={classes.login}
              variant={'contained'}
              color={'secondary'}
              component={RouterLink}
              to={'login'}
            >
              Entrar
            </Button>
          ) : (
            <User>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <AccountCircleIcon
                  fontSize={'large'}
                  style={{ color: 'white' }}
                />
              </IconButton>
              <Menu
                id="user-menu"
                className={classes.singOut}
                anchorEl={openMenu}
                keepMounted
                open={Boolean(openMenu)}
                onClose={handleClose}
              >
                <Typography
                  className={classes.item}
                  variant="subtitle1"
                  gutterBottom
                >
                  {currentUser.email}
                </Typography>
                <MenuItem onClick={singOut}>Sair</MenuItem>
              </Menu>
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
  links: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    textDecoration: 'underline',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  login: {
    margin: 'auto',
    marginRight: '0px',
  },
  singOut: {
    marginTop: '60px',
  },
  title: {
    flexGrow: 1,
  },
  item: {
    padding: '6px 16px',
  },
}));
