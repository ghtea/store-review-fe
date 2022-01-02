import React from 'react';
import {Route, Routes } from 'react-router-dom';

import { Home } from './components/pages/Home';
import { Login } from './components/pages/Login';
import { Map } from './components/pages/Map';
import { Error } from './components/pages/Error';
import { Signup } from './components/pages/Singup';

const App: React.FunctionComponent = () => {
  return (
	<Routes>
		<Route path="/" element={<Home/>}/>
		<Route path="/login" element={<Login />}/>
		<Route path="/signup" element={<Signup />}/>
		<Route path="/map" element={<Map />}/>
		<Route path="/*" element={<Error />}/>
	</Routes> 
  );
}

export default App;
