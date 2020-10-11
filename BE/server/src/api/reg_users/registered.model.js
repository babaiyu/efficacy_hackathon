const { Model } = require('objection');
const tableNames = require('../../constant/tableNames');
const schema = require('./registered.schema.json');

class Registered extends Model {
	static get tableName() {
		return tableNames.registered_user;
	}

	static get jsonSchema() {
		return schema;
	}
}

module.exports = Registered;
