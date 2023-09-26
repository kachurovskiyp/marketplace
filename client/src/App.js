import { Route, Routes } from 'react-router-dom';

import { serverURI } from './configure';
import { useDispatch } from 'react-redux';
import { logIn } from './store/usersReducer';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NavBar from './views/NavBar/NavBar';
import Register from './pages/Register/Register';

import Container from 'react-bootstrap/Container';

function App() {

	fetch(`${serverURI}auth/user`)
		.then(res => res.json())
		.then(data => console.log(data));

	return (
		<Container>
			<NavBar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</Container>
	);
}

export default App;
