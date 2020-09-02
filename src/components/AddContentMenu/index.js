import React from 'react';
import {
  MenuItem,
  ListItemIcon,
  ListItemText,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  Fab,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import TitleIcon from '@material-ui/icons/Title';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';

import { Container } from './styles';

export default function AddContentMenu(props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  function handleToggle() {
    setOpen((prevOpen) => !prevOpen);
  }

  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  }

  function handleClick(type) {
    props.onClick(type);
    setOpen(false);
  }

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
