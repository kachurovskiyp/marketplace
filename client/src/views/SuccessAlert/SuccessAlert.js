import React from 'react';

import Alert from 'react-bootstrap/Alert';

const SuccessAlert = ({ text }) => {
	return (
		<Alert variant='success'>
			<Alert.Heading>Success!</Alert.Heading>
			<p>{text}</p>
		</Alert>
	)
}

export default SuccessAlert