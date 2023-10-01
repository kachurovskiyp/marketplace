import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { serverURI } from '../../configure';
import { logOut } from '../../store/usersReducer';

function Logout() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const options = {
			method: 'DELETE'
		}

		const logout = async () => {
			await fetch(`${serverURI}auth/logout`, options)
				.then(res => {
					dispatch(logOut());
					navigate('/');
				});
		}

		logout();
	}, [dispatch, navigate])

}

export default Logout