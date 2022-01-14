import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'

import { HomePage } from './components/pages/HomePage';
import { LoginPage } from './components/pages/LoginPage';
import { MapPage } from './components/pages/MapPage';
import { ErrorPage } from './components/pages/ErrorPage';
import { SignupPage } from './components/pages/SignupPage';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import { themes } from './styles/theme';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';

const App: React.FunctionComponent = () => {
	return (
		<ReduxProvider store={store}>
			<ThemeProvider theme={themes.light}>
				<GlobalStyle />
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<SignupPage />} />
						<Route path="/map" element={<MapPage />} />
						<Route path="/*" element={<ErrorPage />} />
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</ReduxProvider>
	);
}

export default App;
