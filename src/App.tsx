import React from 'react';
import {Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'

import { Home } from './components/pages/Home';
import { Login } from './components/pages/Login';
import { Map } from './components/pages/Map';
import { Error } from './components/pages/Error';
import { Signup } from './components/pages/Singup';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import { themes } from './styles/theme';

const App: React.FunctionComponent = () => {
  return (
	<ThemeProvider theme={themes.light}>
		<GlobalStyle/>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/login" element={<Login />}/>
				<Route path="/signup" element={<Signup />}/>
				<Route path="/map" element={<Map />}/>
				<Route path="/*" element={<Error />}/>
			</Routes> 
		</BrowserRouter>
	</ThemeProvider>
  );
}

export default App;
