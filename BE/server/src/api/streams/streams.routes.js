const https = require('https');
const router = require('express').Router();
const Concert = require('../concerts/concerts.model');

router.get('/start/:id', async (reque, respo, next) => {
	try {
		const isConcertExist = await Concert.query()
			.findById(reque.params.id)
			.first();
		if (!isConcertExist) {
			const error = new Error('Concert doesnt exist');
			throw error;
		}
		const req = https.request(
			'https://api.mux.com/video/v1/live-streams',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				auth:
					'51d24bc6-23ae-4fee-b5ac-979effb0ad3c:B1j4Pmr/WR3FV6sKd1rh3ap5F4gIVSFpn4MXaSQOMMix1H+xIxN75CL9IfySuVeVjWsL4W8V9OZ',
			},
			(res) => {
				respo.status(res.statusCode);
				res.setEncoding('utf8');
				res.on('data', async (chunk) => {
					const data = JSON.parse(chunk).data;
					await Concert.query().findById(reque.params.id).patch({
						stream_key: data.stream_key,
						playback_id: data.playback_ids[0].id,
					});
					respo.json({
						data,
						success: true,
					});
				});
			}
		);

		req.on('error', (e) => {
			console.error(`problem with request: ${e.message}`);
		});

		const postData = JSON.stringify({
			playback_policy: ['public'],
			new_asset_settings: {
				playback_policy: ['public'],
			},
		});

		req.write(postData);
		req.end();
	} catch (error) {
		next(error);
	}
});

router.get('/data/:id', async (req, res, next) => {
	try {
		if (req.userData.role_id === 2) {
			const concert = await Concert.query()
				.where({
					eo_id: req.userData.id,
					id: req.params.id,
				})
				.select('stream_key', 'playback_id');
			res.json({
				concert,
				success: true,
			});
		} else {
			const concert = await Concert.query()
				.findById(req.params.id)
				.select('playback_id');
			res.json({
				concert,
				success: true,
			});
		}
	} catch (error) {
		next(error);
	}
});

router.put('/watched/:id', async (req, res, next) => {
	try {
		await Concert.query().findById(req.params.id).increment('watched', 1);
		res.json({
			success: true,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
