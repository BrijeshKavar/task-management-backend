const bcrypt = require('bcrypt');
const passwordsaltRound= 10
const encryptPassword = (password) => {
  try {
    return bcrypt.hashSync(password, passwordsaltRound);
  } catch (error) {
    return null;
  }
};
const encrypted = encryptPassword('password')
  const insertData = [
    {
      name: 'Admin',
      email: 'admin@gmail.com',
      password: encrypted,
      role: 'admin',
    },
    {
      name: 'Manager',
      email: 'manager@gmail.com',
      password: encrypted,
      role: 'manager',
    },
    {
      name: 'Member',
      email: 'member+1@gmail.com',
      password: encrypted,
      role: 'member',
    },
  ];

exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(function () {
      return knex.raw('ALTER TABLE users AUTO_INCREMENT = 1');
    })
    .then(function () {
      return knex('users').insert(insertData);
    });
};