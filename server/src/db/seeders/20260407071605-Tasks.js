'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Biba',
          email: 'biba@example.com',
          password: await bcrypt.hash('SecurePass123!', 10),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Tasks',
      [
        {
          title: 'Захватить мир',
          text: 'И стать диктатором',
          user_id: 1,
        },
        {
          title: 'Покормить собаку',
          text: 'Собака хочет есть',
          user_id: 1,
        },
        {
          title: 'Продать брата',
          text: 'Дорого',
          user_id: 1,
        },
        {
          title: 'Поспать',
          text: 'Часов 30 минимум',
          user_id: 1,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
