const { Model } = require('objection');
const tableNames = require('../../constant/tableNames');
const schema = require('./feedbacks.schema.json');

class Feedback extends Model {
	static get tableName() {
		return tableNames.feedback;
	}

	static get jsonSchema() {
		return schema;
	}
}

module.exports = Feedback;
