import React from 'react';

import { Container, Empty, Image } from './styles';

export default function ImagePicker({
  id,
  placeHolder = 'Selecione uma Imagem',
  value,
  onChange,
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
            <p style={{ margin: '60px 30px' }}>{placeHolder}</p>
          </Empty>
        )}
      </label>
    </Container>
  );
}
