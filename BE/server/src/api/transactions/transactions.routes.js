const router = require('express').Router();

const Transaction = require('./transactions.model');
const User = require('../users/users.model');
const Concert = require('../concerts/concerts.model');
const Registered = require('../reg_users/registered.model');

router.get('/', async (req, res, next) => {
	try {
		const transactions = await Transaction.query().where(
			'user_id',
			req.userData.id
		);
		res.json({
			transactions,
			success: true,
		});
	} catch (error) {
		next(error);
	}
});

router.post('/pay', async (req, res, next) => {
	try {
		const payed = await Transaction.query().insert(req.body);
		const concert = await Concert.query()
			.findById(req.body.concert_id)
			.increment('registered', 1)
			.returning('title', 'registered');
		const user = await User.query()
			.findById(req.body.user_id)
			.increment('point', req.body.nominal / 1000)
			.returning('name', 'point');
		const regUsers = await Registered.query().insert({
			user_id: req.body.user_id,
			concert_id: req.body.concert_id,
		});
		res.json({
			payed,
			concert,
			user,
			regUsers,
			success: true,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
