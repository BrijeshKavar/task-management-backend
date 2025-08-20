import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import User from './User';
import Project from './Project';
import ActivityLog from './ActivityLog';

export default class Task extends Model {
  id!: number;
  order_index!: number;
  title!: string;
  description?: string;
  status!: 'To Do' | 'In Progress' | 'Done';
  priority!: 'Low' | 'Medium' | 'High';
  due_date!: Date;
  project_id?: number;
  assignee_id?: number;

  static get tableName() {
    return 'tasks';
  }

  static relationMappings: RelationMappings | RelationMappingsThunk = () => {
    return {
      assignee: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'tasks.assignee_id',
          to: 'users.id',
        },
      },
      project: {
        relation: Model.BelongsToOneRelation,
        modelClass: Project,
        join: {
          from: 'tasks.project_id',
          to: 'projects.id',
        },
      },
      activityLogs: {
        relation: Model.HasManyRelation,
        modelClass: ActivityLog,
        join: {
          from: 'tasks.id',
          to: 'activity_logs.task_id',
        },
      },
    };
  };
}
