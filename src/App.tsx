import React from 'react';
import {Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'

import { HomePage } from './components/pages/HomePage';
import { LoginPage } from './components/pages/LoginPage';
import { MapPage } from './components/pages/MapPage';
import { ErrorPage } from './components/pages/ErrorPage';
import { SignupPage } from './components/pages/SignupPage';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import { themes } from './styles/theme';

const App: React.FunctionComponent = () => {
  return (
	<ThemeProvider theme={themes.light}>
		<GlobalStyle/>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage/>}/>
				<Route path="/LoginPage" element={<LoginPage />}/>
				<Route path="/SignupPage" element={<SignupPage />}/>
				<Route path="/MapPage" element={<MapPage />}/>
				<Route path="/*" element={<ErrorPage />}/>
			</Routes> 
		</BrowserRouter>
	</ThemeProvider>
  );
}

export default App;
