const router = require('express').Router();

const connection = require('../db');

const auth = require('./auth/auth.routes');

router.get('/', (req, res) => {
	res.json({
		message: 'Masuk api',
	});
});
router.use('/auth', auth);

module.exports = router;
