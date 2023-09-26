import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { logIn } from '../../store/usersReducer';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

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
					dispatch(logIn({ login }));
					navigate('/');
				} else if (res.status === 400) {
					setStatus('clientError');
				} else {
					setStatus('serverError');
				}
			}).catch(err => {
				setStatus('serverError');
			});
	}

	return (
		<>
			{status === 'success' && (
				<Alert variant='success'>
					<Alert.Heading>Success!</Alert.Heading>
					<p>You have been successfuly logged in</p>
				</Alert>
			)}

			{status === 'serverError' && (
				<Alert variant='danger'>
					<Alert.Heading>Something went wrong</Alert.Heading>
					<p>Unexpected error... Try again!</p>
				</Alert>
			)}

			{status === 'clientError' && (
				<Alert variant='danger'>
					<Alert.Heading>Incorrect data</Alert.Heading>
					<p>Login or password are incorrect</p>
				</Alert>
			)}

			{status === 'loading' && (
				<Spinner animation="border" role="status" className='block mx-auto'>
					<span className="visually-hidden">Loading...</span>
				</Spinner>)
			}

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