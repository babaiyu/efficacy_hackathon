const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

app.get('/', (req, res) => {
	res.json('Hackathon Lancar');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Listening at port:${PORT}`);
});
