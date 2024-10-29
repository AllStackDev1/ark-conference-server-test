/** @type {import('sequelize-cli').Migration} */

import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('Conferences', [
      {
        id: '40d9f6d6-716f-4e05-9a90-751abbd2f72a',
        theme:
          'Carbon Footprint Management in Business through Technology and Innovation',
        location: 'Singapore, Singapore',
        image:
          'https://www.ipi-singapore.org/contents/2022/10/1260x600pxwebsite-kv-min-16647939668708/1260x600px_Website%20KV-min.png',
        datetime: '2022-11-10T14:00:00.137Z',
        createdAt: '2022-10-10T14:00:00.137Z',
        updatedAt: '2022-10-10T14:00:00.137Z',
      },
      {
        id: 'f6a9a96a-ad0d-46f9-958e-f8faacda7264',
        theme: 'Climate Change & Planetary Health Conference',
        location: 'Vancouver, Canada',
        image:
          'https://medicalstaff.islandhealth.ca/sites/default/files/2024-06/Pictures/CC%26PH%20Conference%20Event%20Banner%20(1).jpg',
        datetime: '2022-09-26T14:00:00.137Z',
        createdAt: '2022-07-03T14:00:00.137Z',
        updatedAt: '2022-07-03T14:00:00.137Z',
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('Conferences', {}, {});
  },
};
