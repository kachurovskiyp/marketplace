import React from 'react';

import Alert from 'react-bootstrap/Alert';

const ServerErrorAlert = () => {
	return (
		<Alert variant='danger'>
			<Alert.Heading>Something went wrong</Alert.Heading>
			<p>Unexpected error... Try again!</p>
		</Alert>
	)
}

export default ServerErrorAlert