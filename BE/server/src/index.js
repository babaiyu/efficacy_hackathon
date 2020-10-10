const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

const app = express();

const api = require('./api/index');

const middlewares = require('./middlewares');

app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(compression());

app.get('/', (req, res) => {
	res.json('Hackathon Lancar');
});

app.use('/api', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Listening at port:${PORT}`);
});
