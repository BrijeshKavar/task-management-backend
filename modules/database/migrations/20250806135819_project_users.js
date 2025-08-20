/** @typedef {import('knex/types').Knex} knex */

/**
 * 
 * @param {knex} knex 
 * @returns 
 */
exports.up = async (knex) => {
	return await knex.schema.createTable('project_users', (t) => {
		t.integer('project_id').unsigned().notNullable().references('id').inTable('projects').onDelete('CASCADE');
		t.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
		t.primary(['project_id', 'user_id']);
	});
};

/**
 * 
 * @param {knex} knex 
 * @returns 
 */
exports.down = (knex) => {
	return knex.schema.dropTableIfExists('project_users');
};
