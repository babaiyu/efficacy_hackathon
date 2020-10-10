const Knex = require('knex');
const tableNames = require('../../src/constant/tableNames');

function references(table, tableName) {
	return table
		.integer(`${tableName}_id`)
		.unsigned()
		.references('id')
		.inTable(tableName)
		.onDelete('cascade')
		.notNullable();
}
/**
 * @param {Knex} knex
 */

exports.up = async (knex) => {
	await knex.schema.createTable(tableNames.user, (table) => {
		table.increments().notNullable();
		table.string('name').notNullable();
		table.string('username').notNullable().unique();
		table.string('email').notNullable().unique();
		table.string('password').notNullable();
		table.string('organization');
		table.integer('age');
		table.integer('point').defaultTo(0);
		table.integer('role_id').notNullable();
		table.timestamps(false, true);
	});

	await knex.schema.createTable(tableNames.concert, (table) => {
		table.increments().notNullable();
		table
			.integer(`eo_id`)
			.unsigned()
			.references('id')
			.inTable('concert')
			.onDelete('cascade')
			.notNullable();
		table.string('title').notNullable();
		table.text('description').notNullable();
		table.dateTime('date').notNullable();
		table.integer('price').notNullable();
		table.integer('min_age');
		table.timestamps(false, true);
	});

	await knex.schema.createTable(tableNames.statistic, (table) => {
		table.increments().notNullable();
		references(table, 'concert');
		table.integer('registered').notNullable().defaultTo(0);
		table.integer('watched').notNullable().defaultTo(0);
		table.timestamps(false, true);
	});

	await knex.schema.createTable(tableNames.registered_user, (table) => {
		table.increments().notNullable();
		references(table, 'user');
		references(table, 'concert');
		table.timestamps(false, true);
	});

	await knex.schema.createTable(tableNames.feedback, (table) => {
		table.increments().notNullable();
		references(table, 'user');
		references(table, 'concert');
		table.integer('score').notNullable();
		table.text('comment');
		table.timestamps(false, true);
	});

	await knex.schema.createTable(tableNames.transaction, (table) => {
		table.increments().notNullable();
		references(table, 'user');
		references(table, 'concert');
		table.dateTime('date').notNullable().defaultTo(knex.fn.now(6));
		table.integer('nominal').notNullable();
		table.string('transaction_media').notNullable();
		table.float('transaction_cut').notNullable();
		table.timestamps(false, true);
	});
};

exports.down = async (knex) => {
	await Promise.all(
		[
			tableNames.feedback,
			tableNames.transaction,
			tableNames.statistic,
			tableNames.registered_user,
			tableNames.concert,
			tableNames.user,
		].map((table) => knex.schema.dropTableIfExists(table))
	);
};
