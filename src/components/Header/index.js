import React, { useContext, useState } from 'react';

// Componentes material-ui
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';

// Link do router
import { Link as RouterLink } from 'react-router-dom';

// Autenticação de user
import { AuthContext } from '../../auth';

// Firebase auth
import { auth } from '../../config/firebaseConfig';

import { LoginButton, User } from './styles';

export default function Header() {
  const { currentUser } = useContext(AuthContext);

  const [openMenu, setOpenMenu] = useState(null);

  /**
   * Faz o logout do usuário
   */
  function singOut() {
    auth.signOut();
    handleClose();
  }

  /**
   * Associa o componente aberto
   * @param {Event} event evento do componente
   */
  function handleClick(event) {
    setOpenMenu(event.currentTarget);
  }

  /**
   * Fecha o componente
   */
  function handleClose() {
    setOpenMenu(null);
  }

  return (
    <AppBar position={'fixed'}>
      <Toolbar>
        <IconButton
          edge={'start'}
          style={{ marginRight: '16px' }}
          color={'inherit'}
          aria-label={'menu'}
          component={RouterLink}
          to={'/'}
        >
          <HomeIcon />
        </IconButton>
        <Typography style={{ marginLeft: '16px', textDecoration: 'underline' }}>
          <Link
            color={'inherit'}
            variant={'h6'}
            component={RouterLink}
            to={'/noticias'}
          >
            Notícias
          </Link>
        </Typography>
        <Typography style={{ marginLeft: '16px', textDecoration: 'underline' }}>
          <Link
            color={'inherit'}
            variant={'h6'}
            component={RouterLink}
            to={'/escolas'}
          >
            Escolas
          </Link>
        </Typography>

        {currentUser ? (
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
              style={{ marginTop: '60px' }}
              anchorEl={openMenu}
              keepMounted
              open={Boolean(openMenu)}
              onClose={handleClose}
            >
              <Typography
                style={{ padding: '6px 16px' }}
                variant="subtitle1"
                gutterBottom
              >
                {currentUser.email}
              </Typography>
              <MenuItem onClick={singOut}>Sair</MenuItem>
            </Menu>
          </User>
        ) : (
          <LoginButton component={RouterLink} to={'login'}>
            Entrar
          </LoginButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
