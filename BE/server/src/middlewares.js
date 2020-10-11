const jwt = require('jsonwebtoken');

function notFound(req, res, next) {
	const error = new Error(`Not Found at ${req.originalUrl}`);
	res.status(404);
	next(error);
}

function errorHandler(error, req, res, next) {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		status: statusCode,
		message: error.message,
		stack: process.env.NODE_ENV === 'production' ? 'XoX' : error.stack,
		errors: error.errors || undefined,
		success: false,
	});
}

function verifyToken(req, res, next) {
	const bearerHeader = req.headers['authorization'];

	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ');
		const token = bearer[1];
		try {
			const userData = jwt.verify(token, process.env.JWT_SECRET);
			req.token = token;
			req.userData = userData;
			next();
		} catch (error) {
			next(error);
		}
	} else {
		res.sendStatus(403);
	}
}

module.exports = {
	notFound,
	errorHandler,
	verifyToken,
};
