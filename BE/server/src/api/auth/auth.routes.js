const express = require('express');
const yup = require('yup');
const bcrypt = require('bcrypt');
const jwt = require('../../lib/jwt');
const User = require('../users/users.model');

const router = express.Router();

const schema = yup.object().shape({
	name: yup
		.string()
		.trim()
		.min(2)
		.matches(/[a-z ]+/i)
		.required(),
	username: yup
		.string()
		.trim()
		.min(2)
		.matches(/[a-z]+/i)
		.required(),
	email: yup.string().trim().email().required(),
	password: yup
		.string()
		.min(8)
		.max(100)
		.matches(/[^a-zA-Z0-9]/, 'Must contain a special character')
		.matches(/[A-Z]/, 'Must contain an uppercase letter')
		.matches(/[a-z]/, 'Must contain a lowercase letter')
		.matches(/[0-9]/i, 'Must contain a number')
		.required(),
	age: yup.number(),
	organization: yup.string().min(2),
	role_id: yup.number().min(1).max(2).required(),
});

router.post('/signup', async (req, res, next) => {
	// TODO: LOTS OF REFACTOR
	const {
		name,
		username,
		email,
		password,
		role_id,
		age,
		organization,
	} = req.body;

	try {
		if (role_id === 1) {
			if (!age) {
				const error = new Error('Age is empty');
				throw error;
			}
		} else {
			if (!organization) {
				const error = new Error('Organization is empty');
				throw error;
			}
		}
		const newUser = {
			name,
			username,
			email,
			password,
			age,
			organization,
			role_id,
		};
		await schema.validate(newUser, {
			abortEarly: false,
		});
		const existingUser = await User.query()
			.where({ email })
			.orWhere({ username })
			.first();
		if (existingUser) {
			const message = existingUser.email === email ? 'Email' : 'Username';
			const error = new Error(`${message} in use`);
			res.status(403);
			throw error;
		}
		const hashedPassword = await bcrypt.hash(password, 12);
		const insertedUser = await User.query().insert({
			name,
			username,
			email,
			password: hashedPassword,
			age,
			organization,
			role_id,
		});
		delete insertedUser.password;
		// TODO: Adjust payload as needed
		const payload = {
			id: insertedUser.id,
			name,
			email,
			role_id,
		};
		const token = await jwt.sign(payload);
		res.json({
			user: payload,
			token,
			success: true,
		});
	} catch (error) {
		next(error);
	}
});

router.post('/signin', async (req, res, next) => {
	const { email, password } = req.body;
	try {
		await schema.validate(
			{
				name: 'DocD',
				email,
				password,
			},
			{
				abortEarly: false,
			}
		);
		const user = await User.query().where({ email }).first();
		if (!user) {
			const error = new Error('Invalid login');
			res.status(403);
			throw error;
		}
		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			const error = new Error('Invalid login');
			res.status(403);
			throw error;
		}
		const payload = {
			id: user.id,
			name: user.name,
			email,
		};
		const token = await jwt.sign(payload);
		res.json({
			user: payload,
			token,
			success: true,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
