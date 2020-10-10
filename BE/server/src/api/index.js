const router = require('express').Router();

const connection = require('../db');

router.get('/', (req, res) => {
	res.json({
		message: 'Masuk api',
	});
});

module.exports = router;
