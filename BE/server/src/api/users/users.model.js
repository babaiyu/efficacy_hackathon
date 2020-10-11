const { Model } = require('objection');
const tableNames = require('../../constant/tableNames');
const schema = require('./users.schema.json');

class User extends Model {
	static get tableName() {
		return tableNames.user;
	}

	static get jsonSchema() {
		return schema;
	}
}

module.exports = User;
