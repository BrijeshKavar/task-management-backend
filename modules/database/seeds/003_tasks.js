
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      return knex.raw('ALTER TABLE tasks AUTO_INCREMENT = 1');
    })
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {
          order_index: 1,
          title: 'Design new homepage layout',
          description: 'Create wireframes and mockups for the new homepage design',
          status: 'To Do',
          priority: 'High',
          due_date: new Date('2024-01-15T00:00:00Z'),
          project_id: 1,
          assignee_id: 1,
        },
        {
          order_index: 2,
          title: 'Implement user authentication',
          description: 'Set up login, registration, and password reset functionality',
          status: 'In Progress',
          priority: 'Medium',
          due_date: new Date('2024-01-16T00:00:00Z'),
          project_id: 1,
          assignee_id: 1,
        },
        {
          order_index: 3,
          title: 'Write API documentation',
          description: 'Document all API endpoints with examples and response formats',
          status: 'Done',
          priority: 'Low',
          due_date: new Date('2024-01-18T00:00:00Z'),
          project_id: 1,
          assignee_id: 2,
        },
      ]);
    });
};