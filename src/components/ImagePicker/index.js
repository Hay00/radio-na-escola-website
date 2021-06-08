import React from 'react';

import { Container, Empty, Image } from './styles';

export default function ImagePicker({
  id,
  error,
  placeHolder = 'Selecione uma Imagem',
  value,
  onChange,
  avatar,
}) {
  /**
   * Transforma a imagem selecionada para base64
   * @param {Event} event evento do componente
   */
  function onChooseFile({ target }) {
    if (target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(target.files[0]);
      reader.onload = (data) => {
        onChange({ target: { name: 'image', value: data.target.result } });
      };
    }
  }

  const imgSty = avatar
    ? { width: 75, height: 75, objectFit: 'cover', borderRadius: '50%' }
    : { width: '100%', objectFit: 'contain' };

  return (
    <Container avatar={!avatar}>
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
            <img style={imgSty} alt={'Imagem Thumbnail'} src={value} />
          </Image>
        ) : (
          <Empty style={imgSty} error={error}>
            {!avatar && <p style={{ margin: '60px 30px' }}>{placeHolder}</p>}
          </Empty>
        )}
      </label>
    </Container>
  );
}
