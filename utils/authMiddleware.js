const authMiddleware = (req, res, next) => {
	if(process.env.NODE_ENV !== 'production') {
		req.session.user = {_id: '65155f3f32bc3be9c751c289', login: 'John Doe'};
		next();
		return;		
	}

	if (req.session.user) {
		next();
	} else {
		res.status(401).send({ message: 'You are not authorized' });
	}
};

module.exports = authMiddleware;