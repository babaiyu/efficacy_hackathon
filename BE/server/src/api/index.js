const router = require('express').Router();
const { verifyToken } = require('../middlewares');

const connection = require('../db');

const auth = require('./auth/auth.routes');
const concerts = require('./concerts/concerts.routes');
const registered = require('./reg_users/registered.routes');

router.get('/', (req, res) => {
	res.json({
		message: 'Masuk api',
	});
});
router.use('/auth', auth);
router.use(verifyToken);
router.use('/concerts', concerts);
router.use('/registered', registered);

module.exports = router;
