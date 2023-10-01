import React, {useEffect} from 'react';
import styles from './Ad.module.scss';

import { useParams, useNavigate } from 'react-router-dom';
import { getAdById, deleteAdRequest } from '../../store/adReducer';
import { useSelector, useDispatch } from 'react-redux';
import { imagesURL } from '../../configure';

const Ad = ({ user }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const ad = useSelector(state => getAdById(state, id));

	useEffect(() => {
		if(!ad) navigate('/');
	});	

	const editClickHandler = () => {
		navigate(`/edit/${id}`);	
	}

	const deleteClickHandler = () => {
		dispatch(deleteAdRequest(id));
		navigate(`/`);
	}

	return (
		<>
			<h3>{ad.title}</h3>
			<img src={`${imagesURL}${ad.image}`} alt={`${ad.title}`} />
			<p>{`${ad.price} PLN`}</p>
			<p>{`${ad.description}`}</p>
			<p>{`Localization: ${ad.localization}`}</p>
			<div className={styles.sellerwrapper}>
				{user.id === ad.seller._id ? (
					<>
						<button onClick={editClickHandler} type='button'>Edit</button>
						<button onClick={deleteClickHandler} type='button'>Delete</button>
					</>
				) : (
					<>
						<img className={styles.avatar} src={`${imagesURL}${ad.seller.avatar}`} alt='seller' />
						<p>{ad.seller.login}</p>
						<p>Phone: {ad.seller.phone}</p>
					</>
				)}

			</div>
		</>
	)
}

export default Ad;