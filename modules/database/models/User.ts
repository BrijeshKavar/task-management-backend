import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import Project from './Project';
import Task from './Task';
import ActivityLog from './ActivityLog';

export default class User extends Model {
  id!: number;
  name!: string;
  email!: string;
  password?: string;
  googleId?: string;
  role!: 'admin' | 'manager' | 'member';
  createdAt!: string;
  updatedAt!: string;

  static get tableName() {
    return 'users';
  }

  static relationMappings: RelationMappings | RelationMappingsThunk = () => {
    return {
      projects: {
        relation: Model.ManyToManyRelation,
        modelClass: Project,
        join: {
          from: 'users.id',
          through: {
            from: 'project_users.user_id',
            to: 'project_users.project_id',
          },
          to: 'projects.id',
        },
      },
      tasks: {
        relation: Model.HasManyRelation,
        modelClass: Task,
        join: {
          from: 'users.id',
          to: 'tasks.assignee_id',
        },
      },
      activityLogs: {
        relation: Model.HasManyRelation,
        modelClass: ActivityLog,
        join: {
          from: 'users.id',
          to: 'activity_logs.user_id',
        },
      },

    }
  }
}
