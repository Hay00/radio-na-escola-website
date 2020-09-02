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
import AddNews from './pages/AddNews';

function App() {
  return (
    // <ThemeProvider>
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route exact path="/noticias" component={Feed} />
        <Route path="/noticias/:id" component={News} />
        <Route path="/add-noticia" component={AddNews} />
      </Switch>
      <Footer />
      <GlobalStyles />
    </BrowserRouter>
    // </ThemeProvider>
  );
}

export default App;
