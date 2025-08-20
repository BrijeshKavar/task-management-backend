import { Request, Response } from 'express';
import { Project, Task } from '@neiv/db';
import logger from '@neiv/logger/common';
import { pagination } from '@neiv/config';
import { OrderByDirection } from '@neiv/config/constant';

export const getProjectTasks = async (req: Request, res: Response) => {
  try {
    const {
      search,
      status,
      priority,
      assignee,
      recordPerPage = req.query.recordPerPage || pagination.common.defaultRecordPerPage,
      pageNumber = req.query.pageNumber || pagination.common.defaultPageNumber,
      orderDir = req.query.orderDir || pagination.common.defaultOrderDir,
      orderBy = req.query.orderBy || pagination.common.defaultOrderBy,
    } = req.query;
    const startRange = (+pageNumber - 1) * +recordPerPage
    const endRange = +pageNumber * +recordPerPage - 1

    const projectTasks = await Task.query()
      .withGraphFetched('[assignee(selectAssignee),activityLogs(selectActivityLogs)]')
      .modifiers({
        selectAssignee(builder) {
          builder.select('id', 'name')
        },
        selectActivityLogs(builder) {
          builder.select('id', 'action');
        },
      })
      .select('id', 'order_index', 'title', 'description', 'status', 'priority', 'due_date', 'created_at', 'updated_at')
      .where("project_id", req.params.projectId)
      .modify(query => {
        query.where(sq => {
          if (search) {
            sq.where("title", "like", `%${search}%`)
              .orWhere("description", "like", `%${search}%`)
              .orWhereExists(Task.relatedQuery('assignee').where(q => {
                q.where("name", "like", `%${search}%`)
              })
              )
          }
        })
          .where(sq => {
            if (status) sq.where("status", status as string)
            if (priority) sq.where("priority", priority as string)
            if (assignee) sq.where("assignee_id", assignee as string)
          })

      })
      .limit(+recordPerPage)
      .range(+startRange, +endRange)
      .orderBy(`${orderBy}`, orderDir as OrderByDirection);

    return res.withData(projectTasks, 'SUCCESS', 200);
  } catch (error) {
    logger.error('getProjectTasks Catch: ', error);
    return res.withError(error);
  }
}

export const getProjectList = async (req: Request, res: Response) => {
  try {
    const projectDetails = await Project.query()
      .select('id', 'title', 'description')

    return res.withData(projectDetails, 'SUCCESS', 200);
  } catch (error) {
    logger.error('getProjectList Catch: ', error);
    return res.withError(error);
  }
}

export const postTask = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      due_date,
      project_id,
      assignee_id,
    } = req.body

    const existing_tasks = (await Task.query()
      .where({ project_id })
      .count('id as id')
      .first())
      ?.id ?? 0

    const { id } = await Task.query()
      .insert({
        title,
        description,
        status,
        priority,
        order_index: existing_tasks + 1,
        due_date: new Date(due_date),
        project_id,
        assignee_id,
      })

    const newTask = await Task.query()
      .withGraphFetched('[assignee(selectAssignee),activityLogs(selectActivityLogs)]')
      .modifiers({
        selectAssignee(builder) {
          builder.select('id', 'name')
        },
        selectActivityLogs(builder) {
          builder.select('id', 'action');
        },
      })
      .select('id', 'order_index', 'title', 'description', 'status', 'priority', 'due_date', 'created_at', 'updated_at')
      .findById(id)

    return res.withData(newTask, 'SUCCESS', 200);
  } catch (error) {
    logger.error('postTask Catch: ', error);
    return res.withError(error);
  }
}

export const updateTask = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      due_date,
      project_id,
      assignee_id,
    } = req.body

    const task = await Task.query()
      .patch({
        title,
        description,
        status,
        priority,
        due_date: new Date(due_date),
        project_id,
        assignee_id,
      })
      .findById(req.params.taskId)

    return res.withData(task, 'SUCCESS', 200);
  } catch (error) {
    logger.error('updateTask Catch: ', error);
    return res.withError(error);
  }
}

export const updateOrderIndex = async (req: Request, res: Response) => {
  const trx = await Task.startTransaction()
  try {
    const { order } = req.body
    await Promise.all(
      order.map((taskId, ind) => (
        Task.query().findById(taskId).patch({ order_index: ind + 1 })
      ))
    )
    await trx.commit();
    return res.withData(null, 'SUCCESS', 200);
  } catch (error) {
    await trx.rollback();
    logger.error('updateOrderIndex Catch: ', error);
    return res.withError(error);
  }
}