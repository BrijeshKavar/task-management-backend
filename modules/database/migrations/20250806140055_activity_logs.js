/** @typedef {import('knex/types').Knex} knex */

/**
 * 
 * @param {knex} knex 
 * @returns 
 */
exports.up = async (knex) => {
	return await knex.schema.createTable('activity_logs', (t) => {
		t.increments('id').primary();
		t.integer('user_id').unsigned().references('id').inTable('users').onDelete('SET NULL');
		t.integer('task_id').unsigned().references('id').inTable('tasks').onDelete('CASCADE');
		t.text('action').notNullable();
		t.timestamp('created_at').defaultTo(knex.fn.now());
	});
};

/**
 * 
 * @param {knex} knex 
 * @returns 
 */
exports.down = (knex) => {
	return knex.schema.dropTableIfExists('activity_logs');
};
