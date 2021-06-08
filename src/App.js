import React from 'react';

// Injetando primeiro a estilização do material-ui
import { StylesProvider } from '@material-ui/core/styles';

// Dom Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Auth e Rotas privadas
import AuthProvider from './auth';

// Cabeçalho e Rodapé
import Footer from './components/Footer';
import Header from './components/Header';

// Páginas
import About from './pages/About';
import AddNews from './pages/AddNews';
import AddSchool from './pages/AddSchool';
import FeedNews from './pages/FeedNews';
import FeedSchools from './pages/FeedSchools';
import Login from './pages/Login';
import Main from './pages/Main';
import News from './pages/News';
import School from './pages/School';
import PrivateRoute from './routes/PrivateRoute';

// Retira estilos padrões do navegador/html
import GlobalStyles from './styles/GlobalStyles';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <StylesProvider injectFirst>
          <Header />
          <Switch>
            <PrivateRoute exact path="/" component={Main} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/sobre" component={About} />
            <PrivateRoute exact path="/noticias" component={FeedNews} />
            <PrivateRoute exact path="/escolas" component={FeedSchools} />
            <PrivateRoute exact path="/noticias/add" component={AddNews} />
            <PrivateRoute exact path="/escolas/add" component={AddSchool} />
            <PrivateRoute exact path="/noticias/edit/:id" component={AddNews} />
            <PrivateRoute
              exact
              path="/escolas/edit/:id"
              component={AddSchool}
            />
            <PrivateRoute exact path="/noticias/:id" component={News} />
            <PrivateRoute exact path="/escolas/:id" component={School} />
          </Switch>
          <Footer />
          <GlobalStyles />
        </StylesProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}
