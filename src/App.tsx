import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'
import { LoginPage } from './components/pages/LoginPage';
import { MapPage } from './components/pages/MapPage';
import { ErrorPage } from './components/pages/ErrorPage';
import { SignupPage } from './components/pages/SignupPage';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import { themes } from './styles/theme';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import { StorePage } from './components/pages/StorePage';
import { AuthProvider } from './utils/auth';

const App: React.FunctionComponent = () => {

  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <ThemeProvider theme={themes.light}>
          <GlobalStyle />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MapPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/store/:id" element={<StorePage />} />
              <Route path="/*" element={<ErrorPage />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </ReduxProvider>
  );
}

export default App;
