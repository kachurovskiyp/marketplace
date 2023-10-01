import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Spiner from '../../views/Spiner/Spiner';
import SuccessAlert from '../../views/SuccessAlert/SuccessAlert';
import ServerErroAlert from '../../views/ServerErrorAlert/ServerErrorAlert';
import ClientErrorAlert from '../../views/ClientErrorAlert/ClientErrorAlert';

import { useDispatch } from 'react-redux';
import { addAdRequest } from '../../store/adReducer';
import { editAdRequest } from '../../store/adReducer';
import { useNavigate } from 'react-router-dom';

const AdForm = ({ user, ad = null }) => {
	const navigate = useNavigate();
	const [mode, setMode] = useState('add');
	const [status, setStatus] = useState('');
	const [errorText, setErrorText] = useState('');

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [image, setimage] = useState('');
	const [localization, setLocalization] = useState('');

	useEffect(() => {
		if (!user.login) navigate('/login');

		if (ad) {
			setMode('edit');
			setTitle(ad.title);
			setDescription(ad.description);
			setPrice(ad.price);
			setimage(ad.image);
			setLocalization(ad.localization);
		}
	}, [user.login, navigate, ad]);

	const dispatch = useDispatch();

	const resetClientError = () => {
		setStatus('');
		setErrorText('');
	};

	const prepareData = () => {
		const data = new FormData();

		if (title < 10) {
			setStatus('clientError');
			setErrorText('Title is short. Min lehngth is 10 characters');
		} else if (title.length > 50) {
			setStatus('clientError');
			setErrorText('Title is long. Max lehngth is 50 characters');
		} else {
			if (status) resetClientError();
			data.append('title', title);
		}

		if (isNaN(Number(price))) {
			setStatus('clientError');
			setErrorText('Price must be number only');
		} else {
			if (status) resetClientError();
			data.append('price', price);
		}
		if (description) data.append('description', description);

		if (image) {
			data.append('image', image);
		} else {
			data.append('image', 'unset');
		}

		if (localization) data.append('localization', localization);

		data.append('date', new Date());
		data.append('seller', user.id);

		if(mode === 'edit') {
			data.append('_id', ad._id);
		}
		return data;
	}

	const handleSubmit = async e => {
		e.preventDefault();
		setStatus('loading');

		const newAd = prepareData();

		if (mode === 'add') {
			dispatch(addAdRequest(setStatus, newAd));
		} else {
			dispatch(editAdRequest(ad._id, setStatus, newAd));
		}

	};

	return (
		<>
			{status === 'success' && (<SuccessAlert text= {mode === 'add' ? 'New Ad successfuly added!' : 'Ad successfuly edited!'} />)}
			{status === 'serverError' && (<ServerErroAlert />)}
			{status === 'clientError' && (<ClientErrorAlert title='Validation failed!' text={errorText} />)}
			{status === 'loading' && (<Spiner />)}

			<Form className='col-12 col-sm-3 mx-auto' onSubmit={handleSubmit}>
				<h2 className='my-4'>{mode === 'add' ? 'Add new Ad' : 'Edit form'}</h2>
				<Form.Group className='mb-3' controlId='formTitle'>
					<Form.Label>Title</Form.Label>
					<Form.Control type='text' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
				</Form.Group>

				<Form.Group className='mb-3' controlId='formDescription'>
					<Form.Label>Description</Form.Label>
					<Form.Control as='textarea' rows='3' placeholder='Description' value={description} onChange={e => setDescription(e.target.value)} />
				</Form.Group>

				<Form.Group className='mb-3' controlId='formPrice'>
					<Form.Label>Price</Form.Label>
					<Form.Control type='text' placeholder='Price' value={price} onChange={e => setPrice(e.target.value)} />
				</Form.Group>

				<Form.Group className='mb-3' controlId='formFile'>
					<Form.Label>Image</Form.Label>
					<Form.Control type='file' onChange={e => setimage(e.target.files[0])} />
				</Form.Group>

				<Form.Group className='mb-3' controlId='formLocalization'>
					<Form.Label>Localization</Form.Label>
					<Form.Control type='text' placeholder='Localization' value={localization} onChange={e => { setLocalization(e.target.value) }} />
				</Form.Group>

				<Button variant='primary' type='submit'>{mode === 'add' ? 'Add new Ad' : 'Edit Ad'}</Button>
			</Form>

		</>
	)
}

export default AdForm