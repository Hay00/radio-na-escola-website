import React from 'react';
import { IconButton } from '@material-ui/core';

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export default function ContentArrows(props) {
  let { index, maxIndex, onClick } = props;
  const arrowUpEnabled = index > 0;
  const arrowDownEnabled = index < maxIndex - 1;

  return (
    <div style={{ display: 'flex', flexDirection:'column'}}>
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
    </div>
  );
}
