import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { logIn } from '../../store/usersReducer';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Spiner from '../../views/Spiner/Spiner';
import SuccessAlert from '../../views/SuccessAlert/SuccessAlert';
import ServerErroAlert from '../../views/ServerErrorAlert/ServerErrorAlert';
import ClientErrorAlert from '../../views/ClientErrorAlert/ClientErrorAlert'

import { serverURI } from '../../configure';

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [status, setStatus] = useState(null);
	
	const handleSubmit = e => {
		e.preventDefault();

		const options = {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({ login, password })
		}

		setStatus('loading');

		fetch(`${serverURI}auth/login`, options)
		.then(res => {
			if (res.status === 200) {
						setStatus('success');
					} else if (res.status === 400) {
						setStatus('clientError');
					} else {
						setStatus('serverError');
					}
			return res.json();
		})
		.then(data => {
			dispatch(logIn(data));
			navigate('/');
		})
	}

	return (
		<>
			{status === 'success' && (<SuccessAlert text='You have been successfuly logged in' />)}
			{status === 'serverError' && (<ServerErroAlert />)}
			{status === 'clientError' && (<ClientErrorAlert title='Incorrect data' text='Login or password are incorrect' />)}
			{status === 'loading' && (<Spiner />)}

			<Form className='col-12 col-sm-3 mx-auto' onSubmit={handleSubmit}>
				<h2 className='my-4'>Sing up</h2>
				<Form.Group className='mb-3' controlId='formLogin'>
					<Form.Label>Login</Form.Label>
					<Form.Control type='text' value={login} onChange={e => setLogin(e.target.value)} placeholder='Enter Login' />
				</Form.Group>

				<Form.Group className='mb-3' controlId='formPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' />
				</Form.Group>

				<Button variant='primary' type='submit'>Sing In</Button>
			</Form>

		</>
	);
};

export default Login;