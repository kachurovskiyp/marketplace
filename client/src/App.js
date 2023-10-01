import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from './store/usersReducer';
import { loadAdsRequest } from './store/adReducer';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NavBar from './views/NavBar/NavBar';
import Register from './pages/Register/Register';
import Logout from './pages/Logout/Logout';
import AdForm from './pages/AdForm/AdForm';
import EditForm from './pages/EditForm/EditForm';
import Ad from './pages/Ad/Ad';

import Container from 'react-bootstrap/Container';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {dispatch(loadAdsRequest())}, [dispatch]);

	const user = useSelector(state => getUser(state));

	return (
		<Container>
			<NavBar user={user} />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route path='/logout' element={<Logout />} />
				<Route path='/createad' element={<AdForm user={user} />} />
				<Route path='/edit/:id' element={<EditForm user={user} />} />
				<Route path='/ad/:id' element={<Ad user={user} />} />
			</Routes>
		</Container>
	);
}

export default App;
