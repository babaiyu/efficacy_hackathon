const Knex = require('knex');
const tableNames = require('../../src/constant/tableNames');
const Knex = require('knex');

/**
 * @param {Knex} knex
 */

exports.up = async (knex) => {
	await knex.schema.createTable(tableNames.user, (table) => {
		table.increments().notNullable();
		table.string('name').notNullable();
		table.string('username').notNullable().unique();
		table.string('email').notNullable().unique();
		table.timestamps(false, true);
	});

	// TODO: Concert table
	// TODO: Registed_user table
	// TODO: Statistic table
	// TODO: Transaction table
};

exports.down = async (knex) => {};
