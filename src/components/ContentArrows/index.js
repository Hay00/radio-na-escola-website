import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import { Container } from './styles';

export default function ContentArrows({ index, maxIndex, onClick }) {
  const arrowUpEnabled = index > 0;
  const arrowDownEnabled = index < maxIndex - 1;

  return (
    <Container>
      <IconButton
        aria-label={'move-up'}
        size={'small'}
        disabled={!arrowUpEnabled}
        onClick={() => onClick(index, index - 1)}
      >
        <ArrowDropUpIcon fontSize={'large'} />
      </IconButton>
      <IconButton
        aria-label={'move-down'}
        size={'small'}
        disabled={!arrowDownEnabled}
        onClick={() => onClick(index, index + 1)}
      >
        <ArrowDropDownIcon fontSize={'large'} />
      </IconButton>
    </Container>
  );
}
