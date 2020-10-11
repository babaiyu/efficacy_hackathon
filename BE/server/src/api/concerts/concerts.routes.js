const router = require('express').Router();
const Concert = require('./concerts.model');
const Feedback = requir('../feedbacks/feedbacks.model');

// TODO: Check every route

router.get('/', async (req, res, next) => {
	try {
		if (req.userData.role_id === 1) {
			let concerts = await Concert.query()
				.select('id', 'title', 'description', 'price')
				.where('min_age', '<=', req.userData.age)
				.andWhere('date', '>=', new Date());
			concerts.map((concert) => {
				concert.price = concert.price === 0 ? 'FREE' : 'PAID';
			});
			res.json({
				concerts,
				success: true,
			});
		} else {
			const concerts = await Concert.query()
				.select('id', 'title', 'description')
				.where('eo_id', req.userData.id);
			res.json({
				concerts,
				success: true,
			});
		}
	} catch (error) {
		next(error);
	}
});

router.get('/:id', async (req, res, next) => {
	// TODO: Show statistics and feedbacks when opening  with an EO account
	try {
		const concert = await Concert.query().findById(req.params.id);
		if (req.userData.role_id === 1) {
			delete concert.watched;
			res.json({
				concert,
				success: true,
			});
		} else {
			const feedbacks = await Feedback.query().where(
				'concert_id',
				req.params.id
			);
			res.json({
				concert,
				feedbacks,
				success: true,
			});
		}
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	if (req.userData.role_id === 2) {
		try {
			req.body.eo_id = req.userData.id;
			const concert = await Concert.query().insert(req.body);
			res.json({
				concert,
				success: true,
			});
		} catch (error) {
			next(error);
		}
	} else {
		res.sendStatus(403);
	}
});

router.put('/:id', async (req, res, next) => {
	if (req.userData.role_id === 2) {
		try {
			const concert = await Concert.query()
				.findById(req.params.id)
				.update(req.body);
			res.json({
				concert,
				success: true,
			});
		} catch (error) {
			next(error);
		}
	} else {
		res.sendStatus(403);
	}
});

router.delete('/:id', async (req, res, next) => {
	if (req.userData.role_id === 2) {
		try {
			await Concert.query().findById(req.params.id).delete();
			res.json({
				success: true,
			});
		} catch (error) {
			next(error);
		}
	} else {
		res.sendStatus(403);
	}
});

module.exports = router;
