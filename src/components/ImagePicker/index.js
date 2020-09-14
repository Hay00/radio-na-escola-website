import React from 'react';

import { Container, Image, Empty } from './styles';

export default function ImagePicker({
  id,
  placeHolder = 'Selecione uma Imagem',
  value,
  onChange,
}) {
  const onChooseFile = (event) => {
    if (event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (data) => {
        onChange({ target: { name: 'image', value: data.target.result } });
      };
    }
  };

  return (
    <Container>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id={`contained-button-file-${id}`}
        multiple
        onChange={onChooseFile}
        type="file"
      />
      <label htmlFor={`contained-button-file-${id}`}>
        {value.length > 0 ? (
          <Image>
            <img
              style={{ width: '75%', objectFit: 'contain' }}
              alt={'Imagem Thumbnail'}
              src={value}
            />
          </Image>
        ) : (
          <Empty>
            <text style={{ margin: '60px 30px' }}>{placeHolder}</text>
          </Empty>
        )}
      </label>
    </Container>
  );
}
