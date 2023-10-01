import React from 'react'
import { useParams } from 'react-router-dom';
import AdForm from '../AdForm/AdForm';
import { getAdById } from '../../store/adReducer';
import { useSelector } from 'react-redux';

const EditForm = ({ user }) => {
	const { id } = useParams();
	const ad = useSelector(state => getAdById(state, id));

	return (
		<AdForm user={user} ad={ad} />
	)
}

export default EditForm