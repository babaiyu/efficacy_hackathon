const router = require('express').Router();
const Registered = require('./registered.model');
const User = require('../users/users.model');
const Concert = require('../concerts/concerts.model');

router.get('/:id', async (req, res, next) => {
	try {
		const registered = await Registered.query()
			.where('concert_id', req.params.id)
			.select('user_id');
		const users = await User.query()
			.findByIds(registered.map((user) => user.user_id))
			.select('username', 'age');
		res.json({
			users,
			success: true,
		});
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const isUserRegistered = await Registered.query()
			.where({
				user_id: req.body.user_id,
				concert_id: req.body.concert_id,
			})
			.first();
		if (isUserRegistered) {
			const error = new Error('User is already registered');
			throw error;
		}
		const registered = await Registered.query().insert(req.body);
		const concert = await Concert.query()
			.findById(req.body.concert_id)
			.increment('registered', 1);
		res.json({
			registered,
			concert,
			success: true,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
