import React, { useEffect, useState } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';

import NewsCard from '../../components/NewsCard';
import SchoolCard from '../../components/SchoolCard';
import Firebase from '../../utils/firebaseFunctions';

import { Container, Content, Title, Wrapper } from './styles';

export default function Main() {
  const [news, setNews] = useState(null);
  const [schools, setSchools] = useState(null);
  const [showSnackBar, setShowSnackBar] = useState(false);

  useEffect(() => {
    async function getSchools() {
      const data = await Firebase.getAllSchools();
      setSchools(data);
    }
    async function getNews() {
      const data = await Firebase.getAllNews();
      setNews(data);
    }
    getSchools();
    getNews();
  }, []);

  /**
   * Feca a snackbar
   */
  function closeSnackBar() {
    setShowSnackBar(false);
  }

  /**
   * Copia o link para a clipboard do usuário mostrando uma
   * notificação ao copiar
   * @param {String} link link a ser copiado
   */
  function onShare(link) {
    navigator.clipboard.writeText(link);
    setShowSnackBar(true);
  }

  if (news && schools) {
    return (
      <Container>
        <Content>
          <Title>Notícias</Title>
          <Wrapper>
            {news.map((value) => (
              <NewsCard key={value.id} content={value} onShare={onShare} />
            ))}
          </Wrapper>
        </Content>
        <Content>
          <Title>Escolas</Title>
          <Wrapper>
            {schools.map((value) => (
              <SchoolCard key={value.id} content={value} onShare={onShare} />
            ))}
          </Wrapper>
        </Content>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={showSnackBar}
          autoHideDuration={6000}
          onClose={closeSnackBar}
          message="Link copiado!"
        />
      </Container>
    );
  }
  return (
    <Container>
      <CircularProgress
        style={{ position: 'absolute', top: '50%', left: '50%' }}
        color={'primary'}
      />
    </Container>
  );
}
