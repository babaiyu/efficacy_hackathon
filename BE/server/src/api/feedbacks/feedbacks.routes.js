const router = require('express').Router();
const Feedback = require('./feedbacks.model');

router.post('/', async (req, res, next) => {
	try {
		const userFeedback = await Feedback.query()
			.where({
				user_id: req.body.user_id,
				concert_id: req.body.concert_id,
			})
			.first();
		if (userFeedback) {
			const error = new Error('You have submited a feedback');
			throw error;
		}
		const feedback = await Feedback.query().insert(req.body);
		res.json({
			feedback,
			success: true,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
