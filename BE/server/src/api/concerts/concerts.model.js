const { Model } = require('objection');
const tableNames = require('../../constant/tableNames');
const schema = require('./concerts.schema');

class Concert extends Model {
	static get tableName() {
		return tableNames.concert;
	}

	static get jsonSchema() {
		return schema;
	}
}

module.exports = Concert;
