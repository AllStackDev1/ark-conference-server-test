/** @type {import('sequelize-cli').Migration} */

import { type DataTypes, QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('ChatMembers', {
      id: {
        unique: true,
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        unique: true,
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: 'Users', key: 'id' },
      },
      chatId: {
        allowNull: false,
        onDelete: 'CASCADE',
        type: Sequelize.UUID,
        references: { model: 'Chats', key: 'id' },
      },
      joinedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('ChatMembers');
  },
};
