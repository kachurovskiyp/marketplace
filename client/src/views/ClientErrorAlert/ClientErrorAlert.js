import React from 'react';

import Alert from 'react-bootstrap/Alert';

const ClientErrorAlert = ({title, text}) => {
	return (
		<Alert variant='danger'>
			<Alert.Heading>{title}</Alert.Heading>
			<p>{text}</p>
		</Alert>
	)
}

export default ClientErrorAlert