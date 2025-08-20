/** @typedef {import('knex/types').Knex} knex */

/**
 * 
 * @param {knex} knex 
 * @returns 
 */
exports.up = (knex) => {
	return knex.schema.createTable('tableName');
};

/**
 * 
 * @param {knex} knex 
 * @returns 
 */
exports.down = (knex) => {
	return knex.schema.dropTableIfExists('tableName');
};
