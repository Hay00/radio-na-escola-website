import React from 'react';

import {
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { ptBR } from 'date-fns/locale';
import DateFnsUtils from '@date-io/date-fns';

import { Container, Content, LargeInput, SmallInput } from './styles';
import { Delete } from '@material-ui/icons';

export default function Podcast({
  index,
  title,
  about,
  duration,
  createdAt,
  link,
  handlePodcastChange,
  removePodcast,
  handleTimeChange,
}) {
  const classes = useStyles();
  return (
    <Container>
      <Content>
        <LargeInput>
          <TextField
            id={'podcasts-title'}
            name={'title'}
            label={'Título'}
            className={classes.input}
            required
            fullWidth
            margin={'normal'}
            variant={'outlined'}
            value={title}
            onChange={handlePodcastChange(index)}
          />
        </LargeInput>

        <LargeInput>
          <TextField
            id={'podcast-about'}
            name={'about'}
            style={{ margin: 8 }}
            label={'Descrição'}
            placeholder={'Insira um texto'}
            variant={'outlined'}
            required
            fullWidth
            multiline
            margin={'normal'}
            value={about}
            onChange={handlePodcastChange(index)}
          />
        </LargeInput>

        <SmallInput>
          <TextField
            id={'podcasts-duration'}
            name={'duration'}
            label={'Duração'}
            placeholder={'ex: 10MIN'}
            className={classes.input}
            required
            margin={'normal'}
            variant={'outlined'}
            value={duration}
            onChange={handlePodcastChange(index)}
          />
        </SmallInput>

        <SmallInput>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
            <KeyboardDatePicker
              id={'podcast-date'}
              name={'createdAt'}
              autoOk
              variant={'inline'}
              inputVariant={'outlined'}
              label={'Data'}
              format={'dd/MM/yyyy'}
              value={createdAt}
              className={classes.input}
              InputAdornmentProps={{ position: 'end' }}
              onChange={handleTimeChange(index)}
            />
          </MuiPickersUtilsProvider>
        </SmallInput>

        <SmallInput>
          <TextField
            id={'podcast-link'}
            name={'link'}
            label={'Link URL'}
            placeholder={'www.link-do-podcast/radio.mp3'}
            className={classes.input}
            required
            fullWidth
            margin={'normal'}
            variant={'outlined'}
            value={link}
            onChange={handlePodcastChange(index)}
            InputProps={{
              startAdornment: (
                <InputAdornment position={'start'}>
                  <LinkIcon />
                </InputAdornment>
              ),
            }}
          />
        </SmallInput>
      </Content>
      <IconButton
        aria-label={'delete'}
        className={classes.button}
        onClick={() => removePodcast(index)}
      >
        <Delete color={'error'} />
      </IconButton>
    </Container>
  );
}

const useStyles = makeStyles({
  input: {
    margin: '8px',
  },
  button: {
    margin: 'auto',
  },
  img: {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
  },
});
