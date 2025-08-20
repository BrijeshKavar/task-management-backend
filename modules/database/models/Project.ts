import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import User from './User';
import Task from './Task';

export default class Project extends Model {
  id!: number;
  title!: string;
  description?: string;

  static get tableName() {
    return 'projects';
  }

  static relationMappings: RelationMappings | RelationMappingsThunk = () => {
    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'projects.id',
          through: {
            from: 'project_users.project_id',
            to: 'project_users.user_id',
          },
          to: 'users.id',
        },
      },
      tasks: {
        relation: Model.HasManyRelation,
        modelClass: Task,
        join: {
          from: 'projects.id',
          to: 'tasks.project_id',
        },
      },

    }
  }
}
