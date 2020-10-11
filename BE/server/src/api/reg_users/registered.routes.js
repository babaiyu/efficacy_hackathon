const router = require('express').Router();
const Registered = require('./registered.model');
const User = require('../users/users.model');

router.get('/:id', async (req, res, next) => {
	try {
		const registered = await Registered.query()
			.where('contest_id', req.params.id)
			.select('user_id');
		const users = await User.query().findByIds(registered);
		res.json({
			users,
			success: true,
		});
	} catch (error) {
		next(error);
	}
});

router.post('/:id', async (req, res, next) => {
	try {
		const registered = await Registered.query().insert(req.body);
		res.json({
			registered,
			success: true,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
