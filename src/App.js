import React from 'react';

// Router
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Páginas
import Login from './pages/Login';
import Main from './pages/Main';
import FeedNews from './pages/FeedNews';
import FeedSchools from './pages/FeedSchools';
import News from './pages/News';
import AddNews from './pages/AddNews';
import AddSchool from './pages/AddSchool';

// Retira estilos padrões do navegador/html
import GlobalStyles from './styles/GlobalStyles';

// Cabeçalho e Rodapé
import Header from './components/Header';
import Footer from './components/Footer';

import { ThemeProvider } from '@material-ui/core';

function App() {
  return (
    // <ThemeProvider>
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route exact path="/noticias" component={FeedNews} />
        <Route path="/noticias/add-noticia" component={AddNews} />
        <Route exact path="/noticias/:id" component={News} />
        <Route exact path="/escolas" component={FeedSchools} />
        {/* <Route exact path="/escolas/:id" component={Schools} /> */}
        <Route path="/escolas/add-escola" component={AddSchool} />
      </Switch>
      <Footer />
      <GlobalStyles />
    </BrowserRouter>
    // </ThemeProvider>
  );
}

export default App;
