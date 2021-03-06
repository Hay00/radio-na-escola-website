import React from 'react';

import DateFnsUtils from '@date-io/date-fns';

import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import LinkIcon from '@material-ui/icons/Link';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { ptBR } from 'date-fns/locale';

import { Container, Content, LargeInput, SmallInput } from './styles';

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
  return (
    <Container>
      <Content>
        <LargeInput>
          <TextField
            id={'podcasts-title'}
            name={'title'}
            label={'Título'}
            style={{ margin: '8px' }}
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
            style={{ margin: '8px' }}
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
              style={{ margin: '8px' }}
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
            style={{ margin: '8px' }}
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
        style={{ margin: 'auto' }}
        onClick={() => removePodcast(index)}
      >
        <Delete color={'error'} />
      </IconButton>
    </Container>
  );
}
