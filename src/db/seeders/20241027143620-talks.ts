/** @type {import('sequelize-cli').Migration} */

import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('Talks', [
      {
        id: '40d9f6d6-716f-4e05-9a90-751abbd2f72a',
        topic: 'Technology and Innovation',
        location: 'Hall A',
        datetime: '2022-11-10T14:00:00.137Z',
        conferenceId: '40d9f6d6-716f-4e05-9a90-751abbd2f72a',
        createdAt: '2022-10-10T14:00:00.137Z',
        updatedAt: '2022-10-10T14:00:00.137Z',
      },
      {
        id: 'f6a9a96a-ad0d-46f9-958e-f8faacda7264',
        topic: 'Climate Change',
        location: 'Bazel Hall',
        datetime: '2022-09-26T14:00:00.137Z',
        conferenceId: 'f6a9a96a-ad0d-46f9-958e-f8faacda7264',
        createdAt: '2022-07-03T14:00:00.137Z',
        updatedAt: '2022-07-03T14:00:00.137Z',
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('Talks', {}, {});
  },
};
