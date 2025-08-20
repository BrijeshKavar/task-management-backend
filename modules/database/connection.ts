import { Model as ObjectionModel } from 'objection';
import knexGenerator from 'knex';
import { db } from '@neiv/config';

const knex = knexGenerator({ ...db.connection });
const Model = ObjectionModel.knex(knex);

export { Model, knex };
