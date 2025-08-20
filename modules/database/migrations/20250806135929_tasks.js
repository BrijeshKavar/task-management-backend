/** @typedef {import('knex/types').Knex} knex */

/**
 * 
 * @param {knex} knex 
 * @returns 
 */
exports.up = async (knex) => {
	return await knex.schema.createTable('tasks', (t) => {
		t.increments('id').primary();
		t.integer('order_index').notNullable();
		t.string('title').notNullable();
		t.text('description');
		t.enum('status', ['To Do', 'In Progress', 'Done']).defaultTo('To Do');
		t.enum('priority', ['Low', 'Medium', 'High']).defaultTo('Medium');
		t.date('due_date');
		t.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE');
		t.integer('assignee_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
		t.timestamps(true, true);
	});
};

/**
 * 
 * @param {knex} knex 
 * @returns 
 */
exports.down = (knex) => {
	return knex.schema.dropTableIfExists('tasks');
};
