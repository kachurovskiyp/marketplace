import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';
import { serverURI } from '../../configure';


const Register = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [phone, setPhone] = useState('');
	const [avatar, setAvatar] = useState('');
	const [status, setStatus] = useState(null);

	const handleSubmit = e => {
		e.preventDefault();

		const fd = new FormData();
		fd.append('login', login);
		fd.append('password', password);
		fd.append('phone', phone);
		fd.append('avatar', avatar);

		const options = {
			method: 'POST',
			body: fd
		}
		
		setStatus('loading');
		fetch(`${serverURI}auth/register`, options)
			.then(res => {
				switch (res.status) {
					case 201:
						setStatus('success');
						break;
					case 400:
						setStatus('clientError');
						break;
					case 409:
						setStatus('loginError');
						break;
					default:
						setStatus('serverError');
				}
			}).catch(err => {
				setStatus('serverError');
			});
	};

	return (
		<>
			{status === 'success' && (
				<Alert variant='success'>
					<Alert.Heading>Success!</Alert.Heading>
					<p>You have been successfuly registred! you can log in now</p>
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
					<Alert.Heading>No enough data!</Alert.Heading>
					<p>You have to fill all the fields</p>
				</Alert>
			)}

			{status === 'loginError' && (
				<Alert variant='warning'>
					<Alert.Heading>Login is already in use</Alert.Heading>
					<p>You have to use other login</p>
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

				<Form.Group className='mb-3' controlId='formPhone'>
					<Form.Label>Phone number</Form.Label>
					<Form.Control type='tel' value={phone} onChange={e => setPhone(e.target.value)} placeholder='Phone number' />
				</Form.Group>

				<Form.Group className='mb-3' controlId='formFile'>
					<Form.Label>Avatar</Form.Label>
					<Form.Control type='file' onChange={e => setAvatar(e.target.files[0])} />
				</Form.Group>

				<Button variant='primary' type='submit'>Submit</Button>
			</Form>
		</>
	)
}

export default Register;