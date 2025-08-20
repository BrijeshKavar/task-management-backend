
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      return knex.raw('ALTER TABLE projects AUTO_INCREMENT = 1');
    })
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        { title: "Website Redesign", description: "Complete redesign of company website" },
        { title: "Mobile App", description: "Development of mobile application" },
        { title: "Marketing Campaign", description: "Q4 marketing campaign planning" },
      ]);
    });
};