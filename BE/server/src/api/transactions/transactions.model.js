const { Model } = require('objection');
const tableNames = require('../../constant/tableNames');
const schema = require('./transactions.schema.json');

class Transaction extends Model {
	static get tableName() {
		return tableNames.transaction;
	}

	static get jsonSchema() {
		return schema;
	}
}

module.exports = Transaction;
