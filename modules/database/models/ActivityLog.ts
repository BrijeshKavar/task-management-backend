import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import User from './User';
import Task from './Task';

export default class ActivityLog extends Model {
  id!: number;
  user_id?: number;
  task_id!: number;
  action!: string;
  created_at!: string;

  static get tableName() {
    return 'activity_logs';
  }

  static relationMappings: RelationMappings | RelationMappingsThunk = () => {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'activity_logs.user_id',
          to: 'users.id',
        },
      },
      task: {
        relation: Model.BelongsToOneRelation,
        modelClass: Task,
        join: {
          from: 'activity_logs.task_id',
          to: 'tasks.id',
        },
      },

    }
  }
}
