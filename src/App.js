import React from 'react';

// Router
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Páginas
import Login from './pages/Login';
import Main from './pages/Main';
import Feed from './pages/Feed';
import News from './pages/News';

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
        <Route path="/noticias" component={Feed} />
        <Route path="/noticia/:id" component={News} />
      </Switch>
      <Footer />
      <GlobalStyles />
    </BrowserRouter>
    // </ThemeProvider>
  );
}

export default App;
