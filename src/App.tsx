import React from 'react';
import {Route, Routes } from 'react-router-dom';

import { HomePage } from './components/pages/HomePage';
import { LoginPage } from './components/pages/LoginPage';
import { MapPage } from './components/pages/MapPage';
import { ErrorPage } from './components/pages/ErrorPage';
import { SignupPage } from './components/pages/SingupPage';

const App: React.FunctionComponent = () => {
  return (
	<Routes>
		<Route path="/" element={<HomePage/>}/>
		<Route path="/login" element={<LoginPage />}/>
		<Route path="/signup" element={<SignupPage />}/>
		<Route path="/map" element={<MapPage />}/>
		<Route path="/*" element={<ErrorPage />}/>
	</Routes> 
  );
}

export default App;
