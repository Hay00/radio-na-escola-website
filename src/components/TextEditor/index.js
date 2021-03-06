import React, { useCallback, useMemo } from 'react';

import Icon from '@material-ui/core/Icon';

import imageExtensions from 'image-extensions';
import isHotkey from 'is-hotkey';
import isUrl from 'is-url';

import {
  createEditor,
  Editor,
  Element as SlateElement,
  Transforms,
} from 'slate';

import { withHistory } from 'slate-history';

import {
  Slate,
  useFocused,
  useSelected,
  useSlate,
  withReact,
} from 'slate-react';

// Componentes estilizados
import {
  Button,
  Container,
  EditableArea,
  H1,
  H2,
  Image,
  ListItem,
  ListNumber,
  Quote,
  Separator,
  Text,
  ToolBar,
} from './styles';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

export default function TextEditor({ text, setText }) {
  const editor = useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Elementos do editor de texto
  const renderElement = useCallback((props) => <Element {...props} />, []);

  // Elementos dentro de um texto normal (negrito,itálico...)
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  /**
   * Verifica se a imagem é uma url
   *
   * @param {String} url url da imagem
   * @returns Boolean
   */
  function isImageUrl(url) {
    if (!url) return false;
    if (!isUrl(url)) return false;
    const ext = new URL(url).pathname.split('.').pop();
    return imageExtensions.includes(ext);
  }

  /**
   * Gerencia as imagens adicionadas no editor
   *
   * @param {Editor} editor o editor usado
   * @returns Editor
   */
  function withImages(editor) {
    const { insertData, isVoid } = editor;

    editor.isVoid = (element) => {
      return element.type === 'image' ? true : isVoid(element);
    };

    editor.insertData = (data) => {
      const text = data.getData('text/plain');
      const { files } = data;

      if (files && files.length > 0) {
        for (const file of files) {
          const reader = new FileReader();
          const [mime] = file.type.split('/');

          if (mime === 'image') {
            reader.addEventListener('load', () => {
              const url = reader.result;
              insertImage(editor, url);
            });

            reader.readAsDataURL(file);
          }
        }
      } else if (isImageUrl(text)) {
        insertImage(editor, text);
      } else {
        insertData(data);
      }
    };

    return editor;
  }

  /**
   * Verifica se o bloco selecionado está ativado ou não
   *
   * @param {Editor} editor editor usado
   * @param {String} format o formato
   * @returns Boolean
   */
  function isBlockActive(editor, format) {
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    });

    return !!match;
  }

  /**
   * Verifica se o tipo de alinhamento está ativado ou não
   *
   * @param {Editor} editor editor usado
   * @param {String} format o formato
   * @returns Boolean
   */
  function isTextAlignActive(editor, format) {
    const [match] = Editor.nodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n.textAlign === format,
    });

    return !!match;
  }

  /**
   * Verifica se o tipo de marcador está ativado ou não
   *
   * @param {Editor} editor editor usado
   * @param {String} format o formato
   * @returns Boolean
   */
  function isMarkActive(editor, format) {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  }

  /**
   * Alterna o estado dos itens de blocos `h1, h2, quote...`
   * @param {Editor} editor editor usado
   * @param {String} format o formato
   */
  function toggleBlock(editor, format) {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        LIST_TYPES.includes(
          !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
        ),
      split: true,
    });
    const newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    };
    Transforms.setNodes(editor, newProperties);

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  }

  /**
   * Muda o tipo de alinhamento do texto
   * @param {Editor} editor editor usado
   * @param {String} format o formato
   */
  function toggleTextAlign(editor, format) {
    const isActive = isTextAlignActive(editor, format);

    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        LIST_TYPES.includes(
          !Editor.isEditor(n) && SlateElement.isElement(n) && n.textAlign
        ),
      split: true,
    });
    const newProperties = {
      textAlign: isActive ? 'left' : format,
    };

    Transforms.setNodes(editor, newProperties);

    if (!isActive && isList) {
      const block = { textAlign: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  }

  /**
   * Alterna o estado dos itens de marcação `negrito, itálico, sublinhado...`
   * @param {Editor} editor editor usado
   * @param {String} format o formato
   */
  function toggleMark(editor, format) {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  }

  /**
   * Renderiza um elemento que contém uma imagem
   *
   * @param {Object} attributes atributos adicionais
   * @param {*} children conteúdo dentro do elemento
   * @param {Element} element elemento da imagem
   * @returns JSX
   */
  const ImageElement = ({ attributes, children, element }) => {
    const selected = useSelected();
    const focused = useFocused();
    return (
      <div {...attributes}>
        <div contentEditable={false}>
          <Image
            alt="Imagem"
            src={element.url}
            selected={selected}
            focused={focused}
          />
        </div>
        {children}
      </div>
    );
  };

  /**
   * Gera o estilo do alinhamento de texto
   *
   * @param {String} type tipo de alinhamento
   * @returns
   */
  function getTextAlign(type) {
    switch (type) {
      case 'center':
        return { textAlign: 'center' };
      case 'right':
        return { textAlign: 'right' };
      case 'justify':
        return {
          textAlign: 'justify',
          textJustify: 'inter-word',
          whiteSpace: 'normal',
        };

      default:
        return { textAlign: 'left' };
    }
  }

  /**
   * Renderiza os elementos do editor de texto
   *
   * @param {Object} attributes props do componente
   * @param {*} children conteúdo dentro do componente
   * @param {Element} element qual o elemento a ser renderizado
   * @returns JSX
   */
  function Element({ attributes, children, element }) {
    const textAlign = getTextAlign(element.textAlign);
    switch (element.type) {
      case 'block-quote':
        return (
          <Quote style={textAlign} {...attributes}>
            {children}
          </Quote>
        );
      case 'heading-one':
        return (
          <H1 style={textAlign} {...attributes}>
            {children}
          </H1>
        );
      case 'heading-two':
        return (
          <H2 style={textAlign} {...attributes}>
            {children}
          </H2>
        );
      case 'bulleted-list':
        return (
          <ListItem style={textAlign} {...attributes}>
            {children}
          </ListItem>
        );
      case 'list-item':
        return (
          <li style={textAlign} {...attributes}>
            {children}
          </li>
        );
      case 'numbered-list':
        return (
          <ListNumber style={textAlign} {...attributes}>
            {children}
          </ListNumber>
        );
      case 'image':
        const props = { attributes, children, element };
        return <ImageElement style={textAlign} {...props} />;
      default:
        return (
          <Text style={textAlign} {...attributes}>
            {children}
          </Text>
        );
    }
  }

  /**
   * Monta o texto, podendo ser negrito, itálico e sublinhado
   *
   * @param {Object} attributes atributos adicionais
   * @param {*} children conteúdo dentro da leaf
   * @param {*} leaf elemento
   * @returns JSX
   */
  function Leaf({ attributes, children, leaf }) {
    if (leaf.bold) {
      children = <strong>{children}</strong>;
    }

    if (leaf.italic) {
      children = <em>{children}</em>;
    }

    if (leaf.underline) {
      children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
  }

  /**
   * Cria um botão para alternar entre os modos
   *
   * @param {Boolean} isBlock é um formatador do tipo bloco?
   * @param {String} format tipo de formato
   * @param {String} icon tipo de ícone
   * @returns JSX
   */
  function Select({ isBlock, isAlign, format, icon }) {
    const editor = useSlate();

    let active = false;
    if (isBlock) {
      active = isBlockActive(editor, format);
    } else if (isAlign) {
      active = isTextAlignActive(editor, format);
    } else {
      active = isMarkActive(editor, format);
    }

    const onClick = (event) => {
      event.preventDefault();
      if (isBlock) {
        toggleBlock(editor, format);
      } else if (isAlign) {
        toggleTextAlign(editor, format);
      } else {
        toggleMark(editor, format);
      }
    };

    return (
      <Button active={active} onMouseDown={onClick}>
        <Icon>{icon}</Icon>
      </Button>
    );
  }

  /**
   * Insere uma imagem em um nó do editor
   *
   * @param {Editor} editor o editor usado
   * @param {String} url url da imagem
   */
  function insertImage(editor, url) {
    const text = { text: '' };
    const image = { type: 'image', url, children: [text] };
    Transforms.insertNodes(editor, image);
  }

  /**
   * Botão para adicionar uma imagem
   *
   * @returns JSX
   */
  function ImageButton() {
    const editor = useSlate();
    return (
      <Button
        onMouseDown={(event) => {
          event.preventDefault();
          const url = window.prompt('Enter the URL of the image:');
          if (!url) return;
          insertImage(editor, url);
        }}
      >
        <Icon>image</Icon>
      </Button>
    );
  }

  return (
    <Container elevation={2}>
      <Slate editor={editor} value={text} onChange={(value) => setText(value)}>
        <ToolBar>
          <Select format="bold" icon="format_bold" />
          <Select format="italic" icon="format_italic" />
          <Select format="underline" icon="format_underlined" />
          <Select isBlock format="block-quote" icon="format_quote" />
          <Separator />
          <Select isBlock format="heading-one" icon="looks_one" />
          <Select isBlock format="heading-two" icon="looks_two" />
          <Separator />
          <Select isAlign format="left" icon="format_align_left" />
          <Select isAlign format="center" icon="format_align_center" />
          <Select isAlign format="right" icon="format_align_right" />
          <Select isAlign format="justify" icon="format_align_justify" />
          <Separator />
          <ImageButton />
          <Separator />
          <Select isBlock format="numbered-list" icon="format_list_numbered" />
          <Select isBlock format="bulleted-list" icon="format_list_bulleted" />
        </ToolBar>
        <EditableArea
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Insira um texto aqui..."
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
    </Container>
  );
}
