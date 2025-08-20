/** @typedef {import('knex/types').Knex} knex */

/**
 * 
 * @param {knex} knex 
 * @returns 
 */
exports.up = async (knex) => {
	return await knex.schema.createTable('projects', (t) => {
		t.increments('id').primary();
		t.string('title').notNullable();
		t.text('description');
		t.timestamps(true, true);
	});
};

/**
 * 
 * @param {knex} knex 
 * @returns 
 */
exports.down = (knex) => {
	return knex.schema.dropTableIfExists('projects');
};
