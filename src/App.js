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

// Temas 
import { ThemeProvider } from '@material-ui/core';

// Auth e Rotas privadas
import AuthProvider from './auth';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    // <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Switch>
          <PrivateRoute exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/noticias" component={FeedNews} />
          <PrivateRoute exact path="/noticias/add-noticia" component={AddNews} />
          <PrivateRoute exact path="/noticias/:id" component={News} />
          <PrivateRoute exact path="/escolas" component={FeedSchools} />
          {/* <Route exact path="/escolas/:id" component={Schools} /> */}
          <Route exact path="/escolas/add-escola" component={AddSchool} />
        </Switch>
        <Footer />
        <GlobalStyles />
      </BrowserRouter>
    </AuthProvider>
    // </ThemeProvider>
  );
}

export default App;
