import React from 'react';

import Spinner from 'react-bootstrap/Spinner';

const Spiner = () => {
	return (
		<Spinner animation="border" role="status" className='block mx-auto'>
			<span className="visually-hidden">Loading...</span>
		</Spinner>
	)
}

export default Spiner