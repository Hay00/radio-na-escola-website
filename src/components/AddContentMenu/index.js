import React, { useRef, useState } from 'react';

import {
  ClickAwayListener,
  Fab,
  Grow,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import ImageIcon from '@material-ui/icons/Image';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import TitleIcon from '@material-ui/icons/Title';

import { Container } from './styles';

export default function AddContentMenu({ onClick }) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  /**
   * Alterna entre o estado de aberto
   */
  function handleToggle() {
    setOpen((prevOpen) => !prevOpen);
  }

  /**
   * Fecha o componente
   * @param {Event} event evento do componente
   */
  function handleClose(event) {
    if (!anchorRef.current && !anchorRef.current.contains(event.target)) {
      setOpen(false);
    }
  }

  /**
   * Seleciona um tipos de conteúdo
   * @param {String} type tipo do conteúdo
   */
  function handleClick(type) {
    onClick(type);
    setOpen(false);
  }

  /**
   * Ao clicar na tecla tab é fechado o menú
   * @param {Event} event
   */
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <Container>
      <Fab
        ref={anchorRef}
        color={'primary'}
        aria-label={'add'}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup={'true'}
        onClick={handleToggle}
      >
        <AddIcon style={{ color: '#fff' }} />
      </Fab>
      <Popper
        style={{ padding: '16px 0px', zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={() => handleClick('subtitulo')}>
                    <ListItemIcon>
                      <TitleIcon fontSize={'small'} />
                    </ListItemIcon>
                    <ListItemText primary={'Subtítulo'} />
                  </MenuItem>

                  <MenuItem onClick={() => handleClick('texto')}>
                    <ListItemIcon>
                      <TextFieldsIcon fontSize={'small'} />
                    </ListItemIcon>
                    <ListItemText primary={'Parágrafo'} />
                  </MenuItem>

                  <MenuItem onClick={() => handleClick('image')}>
                    <ListItemIcon>
                      <ImageIcon fontSize={'small'} />
                    </ListItemIcon>
                    <ListItemText primary={'Imagem'} />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Container>
  );
}
