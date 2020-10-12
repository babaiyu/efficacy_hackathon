const router = require('express').Router();

const Concert = require('./concerts.model');
const Feedback = require('../feedbacks/feedbacks.model');
const Registered = require('../reg_users/registered.model');

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

router.get('/live', async (req, res, next) => {
	try {
		const currentlyLive = await Concert.query()
			.where({
				stream_key: !null,
			})
			.select('title', 'playback_id');
		res.json({
			currentlyLive,
			success: true,
		});
	} catch (error) {
		next(error);
	}
});

router.get('/registered', async (req, res, next) => {
	try {
		const registeredConcert = await Registered.query()
			.where({
				user_id: req.userData.id,
			})
			.select('concert_id');
		const concerts = await Concert.query().findByIds(
			registeredConcert.map((concert) => concert.concert_id)
		);
		const currentDate = new Date();
		const upcoming = concerts.filter((concert) => currentDate <= concert.date);
		const passed = concerts.filter((concert) => currentDate > concert.date);
		res.json({
			upcoming,
			passed,
			success: true,
		});
	} catch (error) {
		next(error);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const concert = await Concert.query().findById(req.params.id).first();
		if (concert) {
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
				let average = 0;
				if (feedbacks.length > 0) {
					feedbacks.map((feedback) => (sum += feedback.score));
					average /= feedbacks.length;
				}
				res.json({
					concert,
					feedbacks: feedbacks === null ? 0 : feedbacks,
					average,
					success: true,
				});
			}
		} else {
			const error = new Error('Concert doesnt exist');
			throw error;
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
				.update(req.body)
				.returning('*');
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
