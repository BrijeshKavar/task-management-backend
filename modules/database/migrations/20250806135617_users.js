/** @typedef {import('knex/types').Knex} knex */

/**
 * 
 * @param {knex} knex 
 * @returns 
 */
exports.up = async (knex) => {
	return await knex.schema.createTable('users', (t) => {
		t.increments('id').primary();
		t.string('name').notNullable();
		t.string('email').notNullable().unique();
		t.string('password');
		t.string('googleId');
		t.enum('role', ['admin', 'manager', 'member']).notNullable().defaultTo('member');
		t.timestamps(true, true);
	});
};

/**
 * 
 * @param {knex} knex 
 * @returns 
 */
exports.down = (knex) => {
	return knex.schema.dropTableIfExists('users');
};
